import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom' 
import * as classFormatter from 'classnames'

import './login.scss'

const default_state = {
	redirect: false,
}

class RequestReset extends React.Component {
	constructor(props) {
		super(props)

		this.state = Object.assign({}, default_state)

		this.requestReset = this.requestReset.bind(this)

		this.requestResetForm = React.createRef()
	}

	requestReset() {
		let url = "http://18.144.58.32:9191/login/request_reset"
		let form = new FormData(this.requestResetForm.current)

		fetch(url, {
			method: 'POST',
			body: form
		})
		.then( res => {
			if (res.ok) {
				this.setState({
					redirect: true,
				})
			} else {
				//more error handling
			}
		})
	}

	render() {
		return (
			<div className="c_request-reset">
				<h1 className="c_request-reset__headline">
					Password Reset
				</h1>
				<Route
					path="/login/request_reset"
					exact>
					{ this.state.redirect && (
						<Redirect to="/login/request_reset/confirm" />
					)}
					<p className="c_request-reset__text">
						Enter the email address associated with the account to reset your password
					</p>
					<form
						className="c_request-reset__form"
						ref={this.requestResetForm}
						id="request_reset_form">
						<input
							className="c_request-reset__form__input"
							type="email"
							name="email"
							placeholder={"email address"}
						/>
					</form>
					<button
						form="request_reset_form"
						className={classFormatter(
							"c_request-reset__button",
							"c_request-reset__button--blue",
						)}
						onClick={ () => this.requestReset() }
						type="button">
						submit
					</button>
				</Route>
				<Route
					path="/login/request_reset/confirm"
					exact>
					<p className="c_request-reset__text">
						Please check your inbox for an email from info@organizeapp.org
					</p>
				</Route>
			</div>
		)
	}
}

export default RequestReset