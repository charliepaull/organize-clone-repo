import React, { useState, useEffect } from 'react'

import DepartmentPreview from '../departments/DepartmentPreview'
import MediaList from './MediaList'
import ResponseInputContainer from '../responses/responseInputContainer'
import './complaints.scss'
import calendarIcon from '../res/image/calendarIcon.png'
import locationIcon from '../res/image/locationIcon.png'

const Complaint = ({match}) => {
	const [ item, setItem ] = useState({})
	const [ responses, setResponses ] = useState({})

	useEffect(
		() => {
			let complaintDataUrl = "http://18.144.58.32:9191/apiv2/complaint/" + match.params.pk
			fetch(complaintDataUrl)
			.then( res => {
				if (res.ok) {
					res.json()
					.then( data => setItem(data))
				}
			})

			let responseDataUrl = "http://18.144.58.32:9191/search/response?complaint=" + match.params.pk
			fetch(responseDataUrl)
			.then( res => {
				if (res.ok) {
					res.json()
					.then( data => setResponses(data))
				}
			})
		},
		[match.params.pk]
	)

	const updateResponses = (response) => {
		setResponses(Object.assign({}, responses, {
			results: [ response, ...responses.results]
		}))
	} 

	return (
		<section
			className="c_complaint">
			{ Object.keys(item).length > 0 && (
				<React.Fragment>
					{ item.user && (
						<div className="c_complaint__row">
							<p className="c_complaint__row__handle"> 
								{ `@${item.user.username}`}
							</p>
						</div>
					)}
					<p
						className="c_complaint__description">
						{ item.description }
					</p>
					{ item.medias && (
						<MediaList media={item.medias} />
					)}
					<div
						className="c_complaint__row">
						<img
							className="c_complaint__row__calendar-icon"
							alt="Complaint date icon"
							src={calendarIcon}>
						</img>
						<time
							className="c_complaint__row__date">
							{ item.date }
						</time>
						{ item.location && (
							<React.Fragment>
								<img
									className="c_complaint__row__location-icon"
									alt="Complaint location icon"
									src={locationIcon}>
								</img>
								<p
									className="c_complaint__row__location">
									{ `${item.location.city}, ${item.location.state}` }
								</p>
							</React.Fragment>
						)}
					</div>
					{ item.department && (
						<DepartmentPreview
							item={item.department}
						/>
					)}
					{ item.officers.length > 0 && (
						<ul className="c_complaint__tag-list">
							{ item.officers.map( (item, index) => (
								<li
									key={index}
									className="c_complaint__tag-list__tag">
									<p> { `${item.first_name} ${item.last_name}` } </p>
								</li>
							))}
						</ul>
					)}
					{ item.tags.length > 0 && (
						<ul className="c_complaint__tag-list">
							{ item.tags.map( (item, index) => (
								<li
									key={index}
									className="c_complaint__tag-list__tag">
									<p> { item.text } </p>
								</li>
							))}
						</ul>
					)}
					{ item.links.length > 0 && (
						<ul className="c_complaint__tag-list">
							{ item.links.map( (item, index) => (
								<li
									key={index}
									className="c_complaint__tag-list__tag">
									<p> { item.link } </p>
								</li>
							))}
						</ul>
					)}
					<ResponseInputContainer
						updateResponses={updateResponses}
						complaint={item.url}>
					</ResponseInputContainer>
				</React.Fragment>
			)}
			{ Object.keys(responses).length > 0 && (
				<ol>
					{ responses.results.map( (response,index) => (
						<li>
							<p> {response.user.username } </p>
							<p> {response.description} </p>
						</li>
					))}
				</ol>
			)}
		</section>
	)
}

export default Complaint