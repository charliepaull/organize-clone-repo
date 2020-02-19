import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";
import * as classFormatter from 'classnames'

import ComplaintPreview from "../complaints/ComplaintPreview"

import './department.scss' 


const filter_options = [
	{
		text: "Most Recent",
		url:  "http://18.144.58.32:9191/apiv2/complaints",
	},
	/* {
		text: "Most Viewed",
		url: "https://clipdbrain.app/analytics/top_stories",
	}, */
]

const defaultState = {
	department_data: {
		results: []
	},
	position: 0,
	dept_info: []
}


class Department extends Component {
	constructor(props) {
		super(props)

		this.state = Object.assign({}, defaultState)

		// bound functions
		this.toggleFilter = this.toggleFilter.bind(this)
		this.viewPrevious = this.viewPrevious.bind(this)
		this.viewMore = this.viewMore.bind(this)
	}

	componentDidMount() {
		// fetches the url from filter_options variable when the position is 0, which here is for the data of "Most Recent."
		let sortOptions = filter_options[this.state.position]

		// fetch stored in a variable
		// have to use dot notation to call the URL value using the key within the object
		fetch(sortOptions.url)
		.then(res => {
			// store response as a json
			res.json() // this is the Response object - looking for 200 status
			.then(data => {
				this.setState({
					department_data: data,
				})
			})
		})
		.catch(error => console.log("Error: ", error))

		// fetch call for the department data with different endpoint
			let dept_data_url = "http://18.144.58.32:9191/apiv2/department/" + this.props.match.params.pk

		fetch(dept_data_url)
		.then(res => {
			res.json()
			.then(data => {
				this.setState({
					dept_info: data
				})
			})
		})
	}

	// toggle between "Most Viewed" and "Most Recent" ComplaintCard posts.
	toggleFilter(index) {
		// grab the utl for when the position is changed to 1. The position is changed to one when we want to make a fetch call for the URL holding the "Most Viewed" data
		// what's the position at the moment? let's change it.
		let newPosition = index
		// okay now the postion is changed to one, therefore grab the url for "Most Viewed"
		let sortOptions = filter_options[newPosition]

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
					department_data: data,
					position: newPosition
				})
			})
		})
		.catch(error => console.log("Error:", error))
	}

	viewPrevious() {
		// make an additional fetch call each time the user clicks the "View Previous" button
		// this url variable needs to be from the "previous" parameter in the state variable.
		let url = this.state.department_data.previous

		// fetching the data from url above
		let moreData = fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			}
		})

		moreData.then(res => {
			let resMoreData = res.json()

			resMoreData.then(data => {
				this.setState({
					department_data: data
				})
			})
		})
	}

	// method to show more card results when user clicks on "View More"
	viewMore() {
		// make an additional fetch call each time the user clicks the "View More" button
		// this url variable needs to be from the "next" parameter in the state variable.
		let url = this.state.department_data.next

		// fetching the data from url above
		let moreData = fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})

		moreData.then(res => {
			let resMoreData = res.json()

			resMoreData.then(data => {
				this.setState({
					department_data: data
				})
			})
		})
	}

	render() {
		return (
			<section
				className="c_department">
				<h1
					className="c_department__header">
						{this.state.dept_info.text}
				</h1>
        <div
            className="c_department__row__department-data"
            style={{
                display: "flex",
                flexDirection: "row",
                borderBottom: "0.0625rem solid #4d9f88"
            }}>
            <img
                className="c_department__row__complaints__icon"
                alt="complaints-icon" />
            <p
                className="c_department__row__complaints">
                    {this.state.department_data.count} Total Complaints
            </p>
            <img
                className="c_department__row__location__icon"
                alt="location-icon" />
            <p
                className="c_department__row__location">
                    {this.state.dept_info.state}
            </p>
        </div>
        <Link
					to="/post"
          className={classFormatter(
						"c_department__complaint-button",
						"c_department__complaint-button--orange"
					)}>
        	{`Submit A Complaint`}
        </Link>
				<h2
					className={classFormatter(
          	"c_department__banner",
					)}>
						{`Complaints`}
				</h2>
				<section
					className="c_department__filters-container">
					{ filter_options.map( (item,index) => (
						<button
							className={classFormatter(
								"c_department__filters-container__filter",
								{"c_department__filters-container__filter--active" : (this.state.position === index)},
							)}
							onClick={ () => this.toggleFilter(index) }>
									{item.text}
						</button>
					))}
				</section>
				<ol
					className="c_department__department-preview-container">
					{ this.state.department_data.results.map( (item,index) => (
						<li className="c_department__department-preview-container__department-preview-outer-container">
							<ComplaintPreview
								item={item}>
							</ComplaintPreview>
						</li>
					))}
				</ol>
				<section
					className="c_department__content-controls">
					<button
						className={classFormatter(
							"c_department__content-controls__button",
						)}
						onClick={this.viewPrevious}>
							View Previous
					</button>
					<button
						className={classFormatter(
							"c_department__content-controls__button"
						)}
						onClick={this.viewMore}>
							View More
					</button>
				</section>
			</section>
		)
	}
}

export default Department
