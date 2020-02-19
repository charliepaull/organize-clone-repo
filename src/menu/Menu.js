import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import * as classFormatter from 'classnames'

import './menu.scss'
import { DESKTOP_LINKS } from '../header/Header.js'

const Menu = ({token}) => (
	<nav className="c_menu">
		{ DESKTOP_LINKS.map( (item,index) => (
			<Link
				key={index} 
				to={item.to}
				className={classFormatter(
					"c_menu__link",
					"c_menu__link--blue",
					{"c_menu__link--hidden": (item.condition) ? !item.condition(token) : false},
				)}> 
				{item.text} 
			</Link>
		))}
	</nav> 
)

export default Menu