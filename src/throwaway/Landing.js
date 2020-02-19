import React from 'react'
import * as classFormatter from 'classnames'

import './landing.scss'
import organizeLogo from '../res/image/logo.png'
import facebookIcon from '../res/image/facebook/blueCircleFIcon.png'
import instagramIcon from '../res/image/instagram/blackInstagramIcon.png'
import twitterIcon from '../res/image/twitter/blueCircleTwitterIcon.png'
import linkedInIcon from '../res/image/linkedIn/blueSquareLinkedInIcon.png'
import emailIcon from '../res/image/emailIcon.png'
import anuj from '../res/image/anuj.png'
import ian from '../res/image/ian.png'
import vlad from '../res/image/vlad.jpg'
import charlie from '../res/image/charlie.jpg'


const social_links = [
	{
		icon: facebookIcon,
		altText: 'Organize Facebook page',
		href: 'https://www.facebook.com/organizepolice/',
	},
	{
		icon: instagramIcon,
		altText: 'Organize Instagram page',
		href: 'https://www.instagram.com/organizepolice/',
	},
	{
		icon: twitterIcon,
		altText: 'Organize Twitter page',
		href: 'https://twitter.com/organizepolice',
	}
]

const profiles = [
	{
		image: anuj,
		name: 'Anuj Kommareddy',
		title: 'Co-founder',
		role: 'Manages product, community, and fundraising teams',
		history: 'Board member @Alliance for Safe Traffic Stops, previously @Uber + @TheLatest.com',
		email: 'anuj@organizeapp.org',
		linkedIn: 'https://www.linkedin.com/in/anujkommareddy/',
	},
	{
		image: ian,
		name: 'Ian Hunter',
		title: 'Co-founder',
		role: 'Lead engineer and tech evangelist',
		history: 'Previously @Embrace Healthwear',
		email: 'ian@organizeapp.org',
		linkedIn: 'https://www.linkedin.com/in/ian-hunter-9b156a75/',
	},
	{
		image: vlad,
		name: 'Vlad Abadjiev',
		title: 'Product Manager',
		role: 'Integrates design and engineering in a fluid and cohesive manner',
		email: 'vladimir@organizeapp.org',
		linkedIn: 'https://www.linkedin.com/in/vladimir-abadjiev/',
	},
	{
		image: charlie,
		name: 'Charlie Paull',
		title: 'Software Engineer',
		role: 'Front end engineer and curious learner',
		history: 'Previously @Nice&Co',
		email: 'charles@organize.app',
		linkedIn: 'https://www.linkedin.com/in/charliepaull211/',
	}
]

const Landing = () => (
	<main className="c_landing">
		<img
			src={organizeLogo}
			className="c_landing__logo"
		/>
		<section className="c_landing__section">
			<h1 
				className={classFormatter(
					"c_landing__section__headline",
					"c_landing__section__headline--primary"
				)}>
				Help for victims of police misconduct
			</h1>
			<h2 className="c_landing__section__headline">
				We connect individuals who have been mistreated by the police with people 
				who can help publicize, investigate, and defend their cases.  
			</h2>
			<h2 className="c_landing__section__cta-text">
				Coming soon!
			</h2>
		</section>
		<section className="c_landing__section">
			<h2 className="c_landing__section__headline">
				Follow us to be notified first
			</h2>
			<div className="c_landing__section__social-links">
				{ social_links.map( (item,index) => (
					<a
						key={index}
						href={item.href}
						target="_blank"
						rel="noopener"
						className="c_landing__section__social-links__link-container">
						<img 
							className="c_landing__section__social-links__link-container__link"
							src={item.icon}
							alt={item.altText}
						/>
					</a>
				))}
			</div>
			<a 
				className={classFormatter(
					"c_landing__section__cta-button",
					"c_landing__section__cta-button--blue"
				)}
				target="_blank"
				rel="noopener"
				href="https://forms.gle/LDA2L7jdCBdELHRg8">
				Join our email list
			</a>
		</section>
		<section className="c_landing__section">
			<h2 className="c_landing__section__headline">
				Support our work
			</h2>
			<p className="c_landing__section__text">
				We're a nonprofit, so we rely on donations from the
				community to fund our work
			</p>
			<a
				href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GKP8S7DAUJR3E&source=url"
				rel="noopener"
				target="_blank"
				className={classFormatter(
					"c_landing__section__cta-button",
					"c_landing__section__cta-button--green"
				)}> 
				Donate
			</a>
		</section>
		<section className="c_landing__section">
			<h2 className="c_landing__section__banner"> 
				Meet our team
			</h2>
			<ul className="c_landing__section__bio-cards">
				{ profiles.map( (item,index) => (
					<li 
						className={classFormatter(
							"c_landing__section__bio-cards__bio-card",
							{"c_landing__section__bio-cards__bio-card--right": (index % 2 !== 0)}
						)}>
						<img 
							className="c_landing__section__bio-cards__bio-card__image"
							src={item.image}
						/>
						<div className="c_landing__section__bio-cards__bio-card__details">
							<div className="c_landing__section__bio-cards__bio-card__details__headline">
								<p className="c_landing__section__bio-cards__bio-card__details__headline__name">
									{ item.name }
								</p>
								<p className="c_landing__section__bio-cards__bio-card__details__headline__role">
									{ item.title }
								</p>
							</div>
							<p className="c_landing__section__bio-cards__bio-card__details__text">
								{ item.role}
							</p>
							<p className="c_landing__section__bio-cards__bio-card__details__text">
								{ item.history }
							</p>
							<div className="c_landing__section__bio-cards__bio-card__details__links">
								<a
									target="_blank"
									rel="noopener"
									href={"mailto:" + item.email}
									className="c_landing__section__bio-cards__bio-card__details__links__link"> 
									<img 
										src={emailIcon}
										className="c_landing__section__bio-cards__bio-card__details__links__link__image"
									/>
								</a>
								<a
									target="_blank"
									rel="noopener"
									href={item.linkedIn}
									className="c_landing__section__bio-cards__bio-card__details__links__link"> 
									<img 
										src={linkedInIcon}
										className="c_landing__section__bio-cards__bio-card__details__links__link__image"
									/>
								</a>
							</div>
						</div>
					</li>
				))}
			</ul>
		</section>
	</main>
)

export default Landing