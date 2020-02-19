import React from 'react'
import * as classFormatter from 'classnames'
import { BrowserRouter as Router, Redirect} from 'react-router-dom'

import './post.scss'
import AccountFragment from './account/AccountFragment'
import Story from './story/Story'

const PostPageSelector = ({pages, updatePosition, curPosition}) => {
	return (
		<div className="c_page-indicator">
			{ pages.map( (item,index) => (
				<div
					key={index} 
					className="c_page-indicator__outer-container">
					<button
						onClick={() => updatePosition(index)} 
						className={classFormatter(
							"c_page-indicator__outer-container__inner-container",
							{"c_page-indicator__outer-container__inner-container--left": (index === 0)},
							{"c_page-indicator__outer-container__inner-container--right": (index === pages.length - 1)}
						)}>
						<div 
							className={classFormatter(
								"c_page-indicator__outer-container__inner-container__line",
								{'c_page-indicator__outer-container__inner-container__line--hide': (index === 0)}
							)}>
						</div>
						<div 
							className={classFormatter(
								"c_page-indicator__outer-container__inner-container__dot",
								{"c_page-indicator__outer-container__inner-container__dot--active": (curPosition === index)}
							)}>
						</div>
						<div 
							className={classFormatter(
								"c_page-indicator__outer-container__inner-container__line",
								{'c_page-indicator__outer-container__inner-container__line--hide': (index === pages.length - 1)}
							)}>
						</div>
					</button>
					<label className="c_page-indicator__outer-container__text"> 
						{ item.label }
					</label>
				</div>
			))}
		</div>
	)
}

const default_state = {
	position: 0,
	redirect: false,
	data: {},
}

const post_tabs = [
	{
		component: AccountFragment,
		label: 'Your Account'
	},
	{
		component: Story,
		label: 'Your Story'
	}
]

class Post extends React.Component {
	constructor(props) {
		super(props)

		this.state = Object.assign({}, default_state)
	
		this.updatePosition = this.updatePosition.bind(this)
		this.submitComplaint = this.submitComplaint.bind(this)

		this.complaintForm = React.createRef()
	}

	updatePosition(position) {
		this.setState({
			position: position,
		})
	}

	submitComplaint() {
		const url = "http://18.144.58.32:9191/apiv2/complaints"
		let form = new FormData(this.complaintForm.current)

		fetch(url, {
			method: "POST",
			body: form,
			headers: {
				'Authorization': "Token  " + this.props.token
			}
		})
		.then( res => {
			if (res.ok) {
				res.json()
				.then( data => {
					this.setState({
						redirect: true,
						data: data,
					})
				})
			} else {
				console.log("Error posting complaint")
			}
		})
	}

	render() {
		return (
			<div className="c_post">
				{ this.state.redirect && (
					<Redirect
						to={"/complaint/"+this.state.data.pk}>
					</Redirect>
				)}
				<h1 className="c_post__title"> 
					Submit a complaint about the police 
				</h1>
				<PostPageSelector
					pages={post_tabs} 
					updatePosition={this.updatePosition}
					curPosition={this.state.position}
				/>
				{ post_tabs.map( (item,index) => (
					<div
						className={classFormatter(
							"c_post__tab-container",
							{"c_post__tab-container--active": (index === this.state.position)}
						)}>
						{ React.createElement(item.component,{key: index, form: "complaint_form", ...this.props})}
					</div>
				))}
				{ this.props.token && (
					<button
						className={classFormatter(
							"c_post__submit",
							"c_post__submit--orange"
						)}
						type="button"
						form="complaint_form"
						onClick={ () => this.submitComplaint()}>
						Submit
					</button>
				)}
				<form
					ref={this.complaintForm}
					id="complaint_form">
				</form>
				<div className="c_post__page-controls">
					{ this.state.position !== 0 && (
						<button
							onClick={ () => this.updatePosition(Math.max(0, this.state.position - 1))}
							className={classFormatter(
								"c_post__page-controls__control-container",
								"c_post__page-controls__control-container--blue"
							)}>
							<pre className="c_post__page-controls__control-container__text">
								{`<--  Previous`}
							</pre>
						</button>
					)}
					{ this.state.position !== post_tabs.length - 1 && (
						<button
							onClick={ () => this.updatePosition(Math.min(post_tabs.length - 1, this.state.position + 1))}
							className={classFormatter(
								"c_post__page-controls__control-container",
								"c_post__page-controls__control-container--blue"
							)}>
							<pre className="c_post__page-controls__control-container__text">
								{`Next  -->`}
							</pre>
						</button>
					)}
				</div>
			</div>
		)
	}
}

export default Post