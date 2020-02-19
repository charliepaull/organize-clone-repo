import React from 'react'
import * as classFormatter from "classnames"

import './about.scss'
import anuj from '../res/image/anuj.png'
import ian from '../res/image/ian.png'
import vlad from '../res/image/vlad.png'
import charlie from '../res/image/charlie.jpg'
import linkedInIcon from '../res/image/linkedIn/blueSquareLinkedInIcon.png'
import emailIcon from '../res/image/emailIcon.png'

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
		name: 'Vladimir Abadjiev',
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

const About = () => (
	<section className="c_about">
		<h1 className="c_about__headline">
			- About us -
		</h1>
		<p className="c_about__description">
			We ensure that victims of police misconduct can get the support they need
		</p>
		<ul className="c_about__info">
			<li className="c_about__info__item">
				<p className="c_about__info__item__text">
					Our users share stories of police misconduct
				</p>
			</li>
			<li className="c_about__info__item">
				<p className="c_about__info__item__text">
					We connect them with people who can help publicize, investigate, and defend their cases
				</p>
			</li>
			<li className="c_about__info__item">
				<p className="c_about__info__item__text">
					Their stories create the first ever nationwide database of police misconduct
				</p>
			</li>
		</ul>
		<h2 className="c_about__donate-text">
			- Support our work -
		</h2>
		<p className="c_about__description">
			We're a nonprofit, so we rely on donations from the community to fund our work
		</p>
		<a 
			href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GKP8S7DAUJR3E&source=url"
			rel="noopener noreferrer"
			target="_blank"
			className={classFormatter(
				"c_about__button",
				"c_about__button--green"
				)}>
				Donate
		</a>
		<h2 className="c_about__banner"> 
			Meet our team
		</h2>
		<ul className="c_about__bio-cards">
			{ profiles.map( (item,index) => (
				<li 
					className={classFormatter(
						"c_about__bio-cards__bio-card",
						{"c_about__bio-cards__bio-card--right": (index % 2 !== 0)}
					)}>
					<img 
						className="c_about__bio-cards__bio-card__image"
						alt="Team member"
						src={item.image}
					/>
					<div className="c_about__bio-cards__bio-card__details">
						<p className="c_about__bio-cards__bio-card__details__name">
							{ item.name }
						</p>
						<p className="c_about__bio-cards__bio-card__details__role">
							{ item.title }
						</p>
						<p className="c_about__bio-cards__bio-card__details__text">
							{ item.role}
						</p>
						<p className="c_about__bio-cards__bio-card__details__text">
							{ item.history }
						</p>
						<div className="c_about__bio-cards__bio-card__details__links">
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={"mailto:" + item.email}
								className="c_about__bio-cards__bio-card__details__links__link"> 
								<img 
									src={emailIcon}
									alt="Email"
									className="c_about__bio-cards__bio-card__details__links__link__image"
								/>
							</a>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={item.linkedIn}
								className="c_about__bio-cards__bio-card__details__links__link"> 
								<img 
									src={linkedInIcon}
									alt="LinkIn profile"
									className="c_about__bio-cards__bio-card__details__links__link__image"
								/>
							</a>
						</div>
					</div>
				</li>
			))}
		</ul>
		<h1 className="c_about__contact-text">
			- contact us -
		</h1>
		<a 
			href="mailto:info@organizeapp.org"
			rel="noopener noreferrer"
			target="_blank"
			className={classFormatter(
				"c_about__button",
				"c_about__button--blue"
				)}>
				Email
		</a>
	</section>
)

export default About