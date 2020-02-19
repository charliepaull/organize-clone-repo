import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

import favicon from '../res/image/faviconWhite.png'
import facebookIcon from '../res/image/facebook/whiteFIcon.png'
import twitterIcon from '../res/image/twitter/whiteTwitterIcon.png'
import instagramIcon from '../res/image/instagram/whiteInstagramIcon.png'

import './footer.scss'

const social_links = [
	{
		image: facebookIcon,
		altText: "Find us on Facebook",
		href: 'https://www.facebook.com/organizepolice/',
	},
	{
		image: instagramIcon,
		altText: "Find us on Instagram",
		href: 'https://www.instagram.com/organizepolice/',
	},
	{
		image: twitterIcon,
		altText: "Find us on Twitter",
		href: 'https://twitter.com/organizepolice',
	}
]

const internal_links = [
	{
		to: '/about',
		title: 'Organize About page',
		text: 'About',
	},
	{
		to: "/post",
		title: 'Organize Post page',
		text: 'Submit a Complaint',
	},
/*	{
		to: '/',
		title:'Organize Contact page',
		text: 'Contact Us',
	},*/
/*	{
		to: '/departments',
		title: 'Organize Department page',
		text: 'Departments',
	},*/
	{
		to: '/terms_of_service',
		title: 'Organize Terms of Service',
		text: 'Terms of Service',
	},
	{
		to: '/privacy',
		title: 'Organize Privacy Policy',
		text: 'Privacy Policy',
	},
/*	{
		to: '/donate',
		title: 'Organize Donation page',
		text: 'Donate',
	},*/
	{
		to: '/login',
		title: 'Organize accounts page',
		text: 'Login or Signup',
	}
]

const Footer = () => (
	<footer className="c_footer">
		<Link
			className="c_footer__brand"
			to="/home"
			title="Organize home page">
			<img 
				className="c_footer__brand__logo"
				alt="Organize Favicon"
				src={favicon}
			/>
		</Link>
		<nav className="c_footer__navigation">
			<div className="c_footer__navigation__link-container">
				{ internal_links.slice(0, internal_links.length/2).map( (item,index) => (
					<Link
						key={index}
						className="c_footer__navigation__link-container__link"
						to={item.to}
						title={item.title}>
						{item.text}
					</Link>
				))}
			</div>
			<div className="c_footer__navigation__link-container">
				{ internal_links.slice(internal_links.length/2).map( (item,index) => (
					<Link
						key={index}
						className="c_footer__navigation__link-container__link"
						to={item.to}
						title={item.title}>
						{item.text}
					</Link>
				))}
			</div>
		</nav>
		<div className="c_footer__social-container">
			{ social_links.map( (item,index) => (
				<a
					key={index} 
					className="c_footer__social-container__link"
					href={item.href}
					rel="noopener noreferrer"
					target="_blank">
					<img 
						className="c_footer__social-container__link__icon"
						src={item.image}
						alt={item.altText}
					/>
				</a>
			))}
		</div>
		<p className="c_footer__copyright">
			Clipd Inc. &#169; 2020
		</p>
	</footer>
)

export default Footer

