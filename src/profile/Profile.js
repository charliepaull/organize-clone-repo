import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import * as classFormatter from 'classnames'

import ComplaintPreview from "../complaints/ComplaintPreview"
import "./profile.scss"

const complaint_sort_options = [
	{
		text: "Most Recent",
		url:  "http://18.144.58.32:9191/apiv2/profile",
	},
]

const defaultState = {
	complaint_data: {
		results: []
	},
	position: 0
}


class Profile extends Component {
	constructor(props) {
		super(props)

		this.state = Object.assign({}, defaultState)

		// bound functions
		this.toggleFilter = this.toggleFilter.bind(this)
		this.viewPrevious = this.viewPrevious.bind(this)
		this.viewMore = this.viewMore.bind(this)
	}

	componentDidMount() {
		fetch(complaint_sort_options[this.state.position].url, {
			method: "GET",
			headers: {
				'Authorization': `Token ${this.props.token}`,
			}
		})
		.then(res => {
			res.json()
			.then(data => {
				this.setState({
					complaint_data: data,
				})
			})
		})
        .catch(error => console.log("Error: ", error))
	}

	// toggle between "Most Viewed" and "Most Recent" ComplaintCard posts.
	toggleFilter() {
		// grab the utl for when the position is changed to 1. The position is changed to one when we want to make a fetch call for the URL holding the "Most Viewed" data
		// what's the position at the moment? let's change it.
		let newPosition = (this.state.position === 0) ? 1 : 0
		// okay now the postion is changed to one, therefore grab the url for "Most Viewed"
		let sortOptions = complaint_sort_options[newPosition]

		// fetch stored in a variable
		let urlData = fetch(sortOptions.url, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
			}
		})

		// response from urlData object
		urlData.then(res => {
			// store response as a json
			let resData = res.json() // this is the Response object - looking for 200 status

			// promise object from successful response object
			resData.then(data => {
				this.setState({
					complaint_data: data,
					position: newPosition
				})
			})
		})
		.catch(error => console.log("Error:", error))
	}

	viewPrevious() {
		fetch(this.state.complaint_data.previous, {
			method: "GET",
			headers: {
				'Authorization': `Token ${this.props.token}`,
			}
		})
		.then(res => {
			res.json()
			.then(data => {
				this.setState({
					complaint_data: data,
				})
			})
		})
        .catch(error => console.log("Error: ", error))
	}

	// method to show more card results when user clicks on "View More"
	viewMore() {
		fetch(this.state.complaint_data.next, {
			method: "GET",
			headers: {
				'Authorization': `Token ${this.props.token}`,
			}
		})
		.then(res => {
			res.json()
			.then(data => {
				this.setState({
					complaint_data: data,
				})
			})
		})
        .catch(error => console.log("Error: ", error))
	}

	render() {
		return (
			<section
				className="c_profile">
				{ !this.props.token && (
					<Redirect to="/login" />
				)}
				<h1
					className="c_profile__handle">
						{ `@${this.props.username}` }
				</h1>
				<h2
					className={classFormatter(
						"c_profile__banner",
					)}>
						{`Complaints`}
				</h2>
				<section
					className="c_profile__filters-container">
					{  complaint_sort_options.map( (item,index) => (
						<button
							key={index}
							className={classFormatter(
								"c_profile__filters-container__filter",
								{"c_profile__filters-container__filter--active" : (this.state.position === index)},
							)}>
								{ item.text }
						</button>
					))}
				</section>
				<ol
					className="c_profile__complaints-preview-container">
					{ this.state.complaint_data.results.map( (item,index) => (
						<li className="c_profile__complaints-preview-container__complaint-preview-outer-container">
							<ComplaintPreview
								item={item}>
							</ComplaintPreview>
						</li>
					))}
				</ol>
				<section
					className="c_profile__content-controls">
					<button
						className={classFormatter(
							"c_profile__content-controls__button",
						)}
						onClick={this.viewPrevious}>
							View Previous
					</button>
					<button
						className={classFormatter(
							"c_profile__content-controls__button"
						)}
						onClick={this.viewMore}>
							View More
					</button>
				</section>
				<button
					onClick={this.props.logout}
					className={classFormatter(
						"c_profile__logout-button",
						"c_profile__logout-button--blue"
					)}>
					log out
				</button>
			</section>
		)
	}
}

export default Profile
