import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import * as classFormatter from 'classnames'

import './home.scss'

const Home = () => (
    <div className="c_home">
    	<section className="c_home__section">
        	<h1 className="c_home__section__title"> 
        		Share stories of police misconduct
        	</h1>
    		<ul className="c_home__section__info-card-container">
    			<li className="c_home__section__info-card-container__card">
    				<p className="c_home__section__info-card-container__card__text"> 
                        Connect with people who can help publicize, investigate, or defend your case
    				</p>
    			</li>
    			<li className="c_home__section__info-card-container__card">
    				<p className="c_home__section__info-card-container__card__text"> 
                        Take action while protecting your privacy and security
    				</p>
    			</li>
                <li className="c_home__section__info-card-container__card">
                    <p className="c_home__section__info-card-container__card__text"> 
                        Contribute to a nationwide database of police misconduct
                    </p>
                </li>
    		</ul>
    		<Link
    			className={classFormatter(
    				"c_home__section__cta-button",
    				"c_home__section__cta-button--primary",
    				"c_home__section__cta-button--orange"
    			)}
    			to="/post">
    			Share
    		</Link>
    	</section>
		<section className="c_home__section">
    		<h1 className="c_home__section__title"> 
    			About us
    		</h1>
            <p className="c_home__section__description">
                We want to ensure victims of police misconduct can get support from their community
            </p>
    		<Link
    			className={classFormatter(
    				"c_home__section__cta-button",
    				"c_home__section__cta-button--secondary",
    				"c_home__section__cta-button--blue"
    			)}
    			to="/about">
    			learn more
    		</Link>
    	</section>
    	<section className="c_home__section">
    		<h2 className="c_home__section__title"> 
    			View past complaints
    		</h2>
            <p className="c_home__section__description">
                View complaints shared by others in the community and offer support if you can
            </p>
    		<Link
    			className={classFormatter(
    				"c_home__section__cta-button",
    				"c_home__section__cta-button--secondary",
    				"c_home__section__cta-button--orange"
    			)}
    			to="/complaints">
    			View Complaints
    		</Link>
    	</section>
    	<section className="c_home__section">
    		<h2 className="c_home__section__title"> 
    			Follow police activity
    		</h2>
            <p className="c_home__section__description">
                Review the history of officer misconduct for any police department in the United States
            </p>
    		<Link
    			className={classFormatter(
    				"c_home__section__cta-button",
    				"c_home__section__cta-button--secondary",
    				"c_home__section__cta-button--green"
    			)}
    			to="/departments">
    			Find your department
    		</Link>
    	</section>
    </div>
)

export default Home