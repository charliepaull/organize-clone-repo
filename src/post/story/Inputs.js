import React, { useState, useEffect, useRef } from 'react'
import * as classFormatter from 'classnames'

import './inputs.scss'

const department_text = "Tag the department involved"
const date_text = "Enter the date of the incident"
const location_text = "Enter the location of the incident"
const officer_first_text = "Enter the Officer's first name"
const officer_last_text = "Enter the Officer's last name"
const officer_badge_text = "Enter the Officer's badge number if available"
const description_text = "Describe what happened in the incident"
const tag_text = "Tag key aspects of the incident to help connect you to appropriate groups and organizations"
const link_text = "Link any external articles or posts which are related to the incident"
const media_text = "Add any photos of videos of the incident to your post"

const InputWithModal = ({type, placeholder, value, setValue, setSelected, info}) => {
	return (
		<div className="c_input-with-modal">
			<input
				placeholder={placeholder}
				size={15}
				className="c_input-with-modal__input"
				type={type}
				value={value}
				onChange={ (event) => setValue(event.target.value)}
			/>
			<button
				onClick={ () => {
					setValue('')
					if (setSelected) {
						setSelected({})
					}
				}} 
				className={classFormatter(
					"c_input-with-modal__button",
					"c_input-with-modal__button--clear"
				)}>
				x
			</button>
			<Modal 
				info={info}
			/>
		</div>
	)
}

const Modal = ( { info } ) => {
	const [ modal, setModal ] = useState(false)

	return (
		<React.Fragment>
			<button
				onClick={ () => setModal(!modal) }
				className={classFormatter(
					"c_input-with-modal__button",
					"c_input-with-modal__button--modal"
				)}>
				i
			</button>
			{ modal && (
				<div className="c_input-with-modal__modal">
					{ info }
				</div>
			)}
		</React.Fragment>
	)
}

const Loading = () => {
	return (
		<div className="lds-ring">
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export const DepartmentInput = ({form}) => {
	const [ value, setValue ] = useState('')
	const [ recommended, setRecommended ] = useState([])
	const [ selected, setSelected ] = useState({})

	useEffect( 
		() => {
			if (value !== '') {
				let url = "http://18.144.58.32:9191/search/department?text=" + value
				fetch(url)
				.then( res => {
					if (res.ok) {
						res.json()
						.then( data => setRecommended(data.results))
					} else {
						//need some error handling
					}
				})			
			}
		},
		[ value ]
	)

	let showSuggested = (value !== '' && value !== selected.text)

	return (
		<div className={classFormatter(
			"c_story__input-container",
			"c_department-input"
			)}>
			<InputWithModal
				value={value}
				setValue={setValue}
				setSelected={setSelected}
				info={department_text}
				type="text"
				placeholder="Enter department"
			/>
			{ showSuggested && ( 
				<ul className="c_department-input__suggested-departments">
					{ recommended.map( (item, index) => (
						<li 
							key={index}
							className="c_department-input__suggested-departments__department">
							<p className="c_department-input__suggested-departments__department__text"> 
								{ item.text } 
							</p>
							<button
								onClick={ () => {
									setSelected(item)
									setValue(item.text)
								}} 
								className="c_department-input__sugested-departments__department__button"> 
								+
							</button>
						</li>
					))}
				</ul>
			)}
			<input
				type="hidden"
				name="department"
				value={selected.url}
				form={form}
			/>
		</div>
	)
}

export const DateInput = ({form}) => {
	const [ value, setValue ] = useState('')

	return (
		<div className={classFormatter(
			"c_story__input-container",
			"c_date-input"
			)}>
			<InputWithModal
				value={value}
				setValue={setValue}
				info={date_text}
				type="date"
			/>
			<input
				type="hidden"
				name="date"
				value={value}
				form={form}
			/>
		</div>
	)
}

export const LocationInput = ({form}) => {
	const [ autocomplete, setAutocomplete ] = useState({})
	const [ value, setValue] = useState('')
	const [ recommended, setRecommended ] = useState([])
	const [ selected, setSelected ] = useState({})

	/* this effect only runs on mount and unmount - see hooks docs */
	useEffect( 
		() => {
			const ac = new window.google.maps.places.AutocompleteService()
			setAutocomplete(ac)
		},
		[],
	)

	useEffect(
		() => {
			if (value !== '') {
		    	autocomplete.getPlacePredictions({
		    		input: value,
		    		componentRestrictions: {
		    			country: 'us',
		    		},
		    		types: ['(cities)'],
		    	}, (predictions, status) => {
		    		if (status === 'OK') {
		    			setRecommended(predictions)
		    		}
		    	})
	    	} else {
	    		setRecommended([])
	    	}
		},
		[ value, autocomplete ]
	)

	const uploadLocation = ( location ) => {
		const url = "http://18.144.58.32:9191/apiv2/locations"
		let form = new FormData()
		form.append('city', location.terms[0].value)
		form.append('state', location.terms[1].value)

		fetch(url, {
			method: 'POST',
			body: form
		})
		.then( res => {
			if (res.ok) {
				res.json()
				.then( data => {
					//add the description field to the selected item
					//this forces the recommended dropdown to collapse
					setSelected(Object.assign({}, data, {
						description: location.description,
					}))
				})
			}
		})
	}

	return (
		<div className={classFormatter(
        	"c_story__input-container",
        	"c_location-input"
        	)}>
        	<InputWithModal
        		value={value}
        		setValue={ setValue }
        		info={location_text}
        		type="text"
        		placeholder="Enter city"
        	/>
        	{ value !== '' && value !== selected.description && ( 
				<ul className="c_location-input__suggested-locations">
					{ recommended.map( (item, index) => (
						<li 
							key={index}
							className="c_location-input__suggested-locations__location">
							<p className="c_location-input__suggested-locations__location__text"> 
								{ item.description } 
							</p>
							<button
								onClick={ () => {
									setValue(item.description)
									uploadLocation(item)
								}}
								className="c_location-input-input__sugested-locations__location__button"> 
								+
							</button>
						</li>
					))}
				</ul>
			)}
			{ Object.keys(selected).length > 0 && (
				<input 
					type="hidden"
					name="location"
					value={selected.url}
					form={form}
				/>
			)}	
        </div>
	)

}

export const OfficerInput = ({form}) => {
	const [ first, setFirst ] = useState('')
	const [ last, setLast ] = useState('')
	const [ badge, setBadge ] = useState('')
	const [ selected, setSelected ] = useState([])

	const uploadOfficer = (officer) => {
		const url = "http://18.144.58.32:9191/apiv2/officers"
		let form = new FormData()

		form.append('first_name', officer.first)
		form.append('last_name', officer.last)
		form.append('badge', officer.badge)

		fetch(url, {
			method: "POST",
			body: form,
		})
		.then( res => {
			if (res.ok) {
				res.json()
				.then( data => setSelected([...selected, data]))
			} else {
				console.log('error creating officer')
			}
		})
	}

	return (
		<div className="c_officer-input">
			<div className="c_officer-input__inputs-row">
				<div className="c_officer-input__inputs-row__inputs">
					<div className={classFormatter(
						"c_story__input-container",
						"c_officer-input__inputs-row__inputs__first",
						)}>
						<InputWithModal
							type="text"
							value={first}
							setValue={setFirst}
							info={officer_first_text}
							placeholder="Officer first name"
						/>
					</div>
					<div className={classFormatter(
						"c_story__input-container",
						"c_officer-input__inputs-row__inputs__last",
						)}>
						<InputWithModal
							type="text"
							value={last}
							setValue={setLast}
							info={officer_last_text}
							placeholder="Last name"
						/>
					</div>
					<div className={classFormatter(
						"c_story__input-container",
						"c_officer-input__inputs-row__inputs__badge"
						)}>
						<InputWithModal
							type="text"
							value={badge}
							setValue={setBadge}
							info={officer_badge_text}
							placeholder="Officer badge number"
						/>
					</div>
				</div>
				<button
					className="c_officer-input__inputs-row__button"
					onClick={ () => {
						uploadOfficer({
							first: first,
							last: last,
							badge: badge,
						})
						setFirst('')
						setLast('')
						setBadge('')
					}}>
					+
				</button>
			</div>
			{ selected.length > 0 && (
				<ul className="c_officer-input__selected"> 
					{ selected.map( (item,index) => (
						<li className="c_officer-input__selected__officer">
							<p> {item.first_name} {item.last_name} {item.badge} </p>
							<button
								className="c_officer-input__selected__officer__button" 
								onClick={ () => setSelected(selected.filter(i => (
								Object.keys(i).map( key => item[key] === i[key]).includes(false) 
							)))}>
								-
							</button>
							<input 
								type="hidden"
								name="officers"
								value={item.url}
								form={form}
							/> 
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export const DescriptionInput = ({form}) => {
	const [ value, setValue ] = useState('')
	const [ modal, setModal ] = useState(false)

	return (
		<div className={classFormatter(
			"c_story__input-container",
			"c_description-input")}>
			<textarea
				className="c_description-input__description"
				type="text"
				name="description"
				form={form}
				value={value}
				onChange={ (event) => setValue(event.target.value)}
				placeholder="Enter your description here"
			/>
			<div className="c_description-input__modal-row">
				<button
					onClick={ () => {
						setValue('')
					}} 
					className={classFormatter(
						"c_input-with-modal__button",
						"c_input-with-modal__button--clear"
					)}>
					<p>x</p>
				</button>
				<button
					onClick={ () => setModal(!modal) }
					className={classFormatter(
						"c_input-with-modal__button",
						"c_input-with-modal__button--modal"
					)}>
					i
				</button>
				{ modal && (
					<div 
						className={classFormatter(
							"c_input-with-modal__modal",
							"c_description-input__modal-row__modal"
						)}>
						{ description_text }
					</div>
				)}
			</div>
		</div>
	)
}

export const TagInput = ({form}) => {
	const [ value, setValue ] = useState('')
	const [ recommended, setRecommended ] = useState([])
	const [ selected, setSelected ] = useState([])

	useEffect(
		() => {
			let url = "http://18.144.58.32:9191/search/tags?text="+value
			fetch(url)
			.then( res => {
				if (res.ok) {
					res.json()
					.then( data => setRecommended(data.results))
				} 
			})
		},
		[ value ]
	)

	return (
		<div className={classFormatter(
			"c_story__input-container",
			"c_tag-input"
			)}>
			<InputWithModal
				type="text"
				value={value}
				setValue={setValue}
				placeholder="Enter tags"
				info={tag_text}
			/>
			{ value !== '' && (
				<ul className="c_tag-input__suggested-tags">
					{ recommended.map( (item,index) => (
						<li 
							key={index}
							className="c_tag-input__suggested-tags__tag">
							<p className="c_tag-input__suggested-tags__tag__text">
								{item.text}
							</p>
							<button
								onClick={ () => {
									setSelected([...selected, item])
									setValue('')
								}}
								className="c_tag-input__suggested-tags__tag__button">
								+
							</button>
						</li>
					))}
				</ul>
			)}
			{ selected.length > 0 && (
				<ul className="c_tag-input__selected">
					{ selected.map( (item,index) => (
						<li 
							key={index}
							className="c_tag-input__selected__tag">
							<p className="c_tag-input__selected__tag__text">
								{item.text}
							</p>
							<button 
								className="c_tag-input__selected__tag__button"
								onClick={ () => setSelected( selected.filter( i => (
									item.url !== i.url
								)))}>
								-
							</button>
							<input
								type="hidden"
								name="tags"
								value={item.url}
								form={form}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export const LinkInput = ({form}) => {
	const [ value, setValue ] = useState('')
	const [ selected, setSelected ] = useState([])

	const uploadLink = (link) => {
		const url = "http://18.144.58.32:9191/apiv2/links"
		let form = new FormData()

		form.append('link', link)

		fetch(url, {
			method: "POST",
			body: form
		})
		.then( res => {
			if (res.ok) {
				res.json()
				.then( data => {
					setSelected([...selected, data])
				})
			} else {
				console.log('error uploading link')
			}
		})
	}

	return (
		<div className="c_link-input">
			<div className={classFormatter(
				"c_story__input-container",
				"c_link-input__input-row",
				)}>
				<InputWithModal
					type="url"
					value={value}
					setValue={setValue}
					info={link_text}
					placeholder={'Enter external links'}
				/>
				<button
					className="c_link-input__input-row__add-button"
					onClick={ () => {
						setValue('')
						uploadLink(value)
					}}>
					+
				</button>
			</div>
			{ selected.length > 0 && (
				<ul className="c_link-input__selected">
					{ selected.map( (item,index) => (
						<li 
							key={index}
							className="c_link-input__selected__link">
							<p className="c_link-input__selected__link__url"> 
								{item.link} 
							</p>
							<button
								className="c_link-input__selected__link__button"
								onClick={ () => setSelected( selected.filter( i => (i.link !== item.link)))}>
								-
							</button>
							<input
								type="hidden"
								name="links"
								value={item.url}
								form={form}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export const MediaInput = ({form}) => {
	const inputRef = useRef(null)
	const [ selected, setSelected ] = useState([])

	const onButtonClick = () => {
		inputRef.current.click()
	}

	const addMedia = (event) => {
		let newMedia = {
			file_name: event.target.files[0],
			local_name: event.target.files[0].name,
			loading: true,
			url: '',
		}

		if (selected.filter( item => item.local_name === newMedia.local_name).length === 0) {
			let newSelected = [...selected, newMedia]
			setSelected(newSelected)
			//need to pass the new selected state down manually because the current selected
			//variable won't be updated until the next render phase
			uploadMedia(newMedia, newSelected)
		}
	}

	const removeMedia = (item) => {
		setSelected( selected.filter( i => i.local_name !== item.local_name))
	}

	const uploadMedia = (media, newSelected) => {
		const url = "http://18.144.58.32:9191/apiv2/media"
		let form = new FormData()
		form.append('file_name', media.file_name)
		form.append('local_name', media.local_name)

		fetch(url, {
			method: 'POST',
			body: form
		})
		.then( res => {
			if (res.ok) {
				res.json()
				.then( data => {
					setSelected( newSelected.map( item => {
						if (item.local_name === data.local_name) {
							//add the loading flag to the response object
							return Object.assign({}, data, {
								loading: false,
							})
						} else {
							return item
						}
					}))
				})
			} else {
				console.log('error submitting media')
			}
		})
	}

	return (
		<div className={ classFormatter(
			"c_story__input-container",
			"c_media-input",
			)}>
			<input
				ref={inputRef}
				className="c_media-input__hidden-input"
				type="file"
				accept="image/*, video/*"
				onChange={ addMedia }
				onInput={ addMedia }
			/>
			<div className="c_media-input__input-row">
				<div className="c_media-input__input-row__description-container">
					<div className="c_media-input__input-row__description-container__detail-row">
						<p 
							className="c_media-input__input-row__description-container__detail-row__text"> 
							Enter photos and videos
						</p>
						<Modal
							info={media_text}
						/>
					</div>
				</div>
				<button
					className="c_media-input__input-row__add-button"
					onClick={onButtonClick}>
					+
				</button>
			</div>
			{ selected.length > 0 && (
				<ul className="c_media-input__selected">
					{ selected.map( (item,index) => (
						<li 
							key={index}
							className="c_media-input__selected__item">
							<p> { item.local_name } </p>
							{ item.loading && (
								<Loading />
							)}
							{ !item.loading && (
								<button
									className="c_media-input__selected__item__button"
									onClick={() => removeMedia(item)}>
									-
								</button>
							)}			
							<input
								type="hidden"
								name="medias"
								value={item.url}
								form={form}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}