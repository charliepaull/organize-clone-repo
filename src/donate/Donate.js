import React from 'react'

import './donate.scss'

const Donate = () => {
	return (
		<div className="c_donate">
			<h1 className="c_donate__title">
				Support our work
			</h1>
			<form
				className="c_donate__donation-form"
				id="donation_form">
				<div className="c_donate__donation-form__values-container">
					<div className="c_donate__donation-form__values-container__suggested-value">
						$10	
					</div>
					<div className="c_donate__donation-form__values-container__suggested-value">
						$25	
					</div>
					<div className="c_donate__donation-form__values-container__suggested-value">
						$50	
					</div>
					<div className="c_donate__donation-form__values-container__suggested-value">
						$100	
					</div>
					<input 
						className="c_donate__donation-form__values-container__value-input"
						type="text"
						placeholder="Enter an amount"
					/>
				</div>
				<input />
				<input />
				<button
					type="button">
					pay dem $$ 
				</button>
			</form>
		</div>
	)
}

export default Donate