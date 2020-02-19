import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import * as classFormatter from 'classnames'

import ComplaintPreview from "./ComplaintPreview"
import "./complaints.scss"

const complaint_sort_options = [
	{
		text: "Most Recent",
		url:  "http://18.144.58.32:9191/apiv2/complaints",
	},
]

const Complaints = () => {
	const [ complaintData, setComplaintData ] = useState({})
	const [ currentUrl, setCurrentUrl ] = useState(complaint_sort_options[0].url)

	useEffect(
		() => {
			fetch(currentUrl)
			.then( res => {
				if (res.ok) {
					res.json()
					.then( data => setComplaintData(data))
				}
			})
		},
		[ currentUrl ]
	)

	return (
		<section
			className="c_complaints">
			<h1
				className="c_complaints__header">
					{`View the most viewed and most recent complaints shared`}
			</h1>
			<h2
				className={classFormatter(
					"c_complaints__banner",
				)}>
					{`Complaints`}
			</h2>
			<section
				className="c_complaints__filters-container">
				{complaint_sort_options.map((item, index) => (
					<button
						className={classFormatter(
							"c_complaints__filters-container__filter",
							{"c_complaints__filters-container__filter--active" : (currentUrl.includes(item.url))},
							"c_complaints__cursor-style"
						)}
						onClick={() => setCurrentUrl([complaint_sort_options[index].url])}>
						{item.text}
					</button>
				))}
			</section>
			<ol
				className="c_complaints__complaints-preview-container">
				{ complaintData.results && complaintData.results.map( (item,index) => (
					<li className="c_complaints__complaints-preview-container__complaint-preview-outer-container">
						<ComplaintPreview
							item={item}>
						</ComplaintPreview>
					</li>
				))}
			</ol>
			<section
				className="c_complaints__content-controls">
				{ complaintData.previous && (
					<button
						className={classFormatter(
							"c_complaints__content-controls__button",
							"c_complaints__cursor-style"
						)}
						onClick={() => setCurrentUrl(complaintData.previous)}>
							View Previous
					</button>
				)}
				{ complaintData.next && (
					<button
						className={classFormatter(
							"c_complaints__content-controls__button",
							"c_complaints__cursor-style"
						)}
						onClick={() => setCurrentUrl(complaintData.next)}>
							View More
					</button>
				)}
			</section>
		</section>
	)
}

export default Complaints
