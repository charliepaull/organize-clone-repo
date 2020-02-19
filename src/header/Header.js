import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

import * as classFormatter from 'classnames'

import logo from '../res/image/logo.png'
import hamburger from '../res/image/hamburger.png'
import complaintIconOrange from '../res/image/complaintIconOrange.png'
import './header.scss'

const MOBILE_LINKS = [
	{
		to: '/login',
		src: complaintIconOrange,
		alt: '"User login and sign up"'
	},
	{
		to: '/menu',
		src: hamburger,
		alt: 'Organize mobile menu'
	}
]

export const DESKTOP_LINKS = [
	{
		to: "/home",
		text: 'Home',
	},
	{
		to: "/post",
		text: 'Create a Complaint',
	},
	{
		to: "/login",
		text: 'Log In',
		condition: (token) => !token,
	},
	{
		to: "/login",
		text: 'Sign Up',
		condition: (token) => !token,
	},
	{
		to: "/profile",
		text: 'Profile',
		condition: (token) => token,
	},
	{
		to: "/complaints",
		text: "Complaints",
	},
	{
		to: '/departments',
		text: 'Departments',
	}
]

const Header = ({token}) => (
	<header className="c_header">
		<Link
			className="c_header__brand"
			title="Organize Home Page"
			to="/home">
			<img
				className="c_header__brand__logo"
				src={logo}
				alt="Organize home page"
			/>
		</Link>
		<nav className="c_header__navigation">
			{ MOBILE_LINKS.map( (item,index) => (
				<Link
					key={index}
					className={classFormatter(
						"c_header__navigation__link",
						"c_header__navigation__link--mobile"
					)}
					to={item.to}>
					<img
						className="c_header__navigation__link__image"
						src={item.src}
						alt={item.alt}
					/>
				</Link>
			))}
			{ DESKTOP_LINKS.map( (item, index) => (
				<Link
					key={index}
					className={classFormatter(
						"c_header__navigation__link",
						"c_header__navigation__link--desktop",
						{"c_header__navigation__link--hidden": (item.condition) ? !item.condition(token) : false},
					)}
					to={ item.to} >
					{ item.text }
				</Link>
			))}
		</nav>
	</header>
)

export default Header
