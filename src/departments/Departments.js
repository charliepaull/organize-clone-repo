import React, { useState, useEffect } from 'react'

import "./departments2.scss"
import searchIcon from '../res/image/searchIcon.png'
import DepartmentPreview from './DepartmentPreview'

const Departments = ( ) => {
	const [ departments, setDepartments ] = useState({})

	useEffect(
		() => {
			const url = "http://18.144.58.32:9191/apiv2/departments"
			fetch(url)
			.then( res => {
				if (res.ok) {
					res.json()
					.then( data => setDepartments(data))
				}
			})
		},
		[]
	)

	return (
		<section
			className="c_departments">
			<h1
				className="c_departments__header">
				Find past complaints shared about any police department
			</h1>
			<div
				className="c_departments__search">
				<img
					className="c_departments__search__icon"
					src={searchIcon}
					alt="search icon"/>
				Find your department
			</div>
			<h2
				className="c_departments__banner">
				Featured Departments
			</h2>
			{ departments.results && (
				<ol>
					{ departments.results.map( (item,index) => (
						<li key={index}>
							<DepartmentPreview
								item={item}>
							</DepartmentPreview>
						</li>
					))}
				</ol>
			)}
		</section>
	)
}

export default Departments
