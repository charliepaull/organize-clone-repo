import React from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import * as classFormatter from 'classnames'

import './login.scss'

const default_state = {
	redirect: false,
}

class Reset extends React.Component {
	constructor(props) {
		super(props)

		this.state = Object.assign({}, default_state)

		this.resetPassword = this.resetPassword.bind(this)

		this.resetPasswordForm = React.createRef()
	}

	resetPassword() {
		let url = "http://18.144.58.32:9191/login/reset"
		let form = new FormData(this.resetPasswordForm.current)

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
				//still need error handling
			}
		})
	}

	render() {
		return (
			<div className="c_reset">
				{ this.state.redirect && (
					<Redirect to="/login" />
				)}
				<h1 className="c_reset__headline"> 
					Password Reset 
				</h1>
				<p className="c_reset__text"> 
					Enter your new password below to reset the account. The passwords must match 
				</p>
				<form
					className="c_reset__form"
					ref={this.resetPasswordForm}
					id="reset_password_form">
					<input
						className="c_reset__form__input"
						type="password"
						name="password_1"
						placeholder="new password"
					/>
					<input
						className="c_reset__form__input"
						type="password"
						name="password_2"
						placeholder="re-enter new password"
					/>
					<input
						type="hidden"
						name="user"
						value={this.props.match.params.username}
					/>
					<input
						type="hidden"
						name="token"
						value={this.props.match.params.token}
					/>
				</form>
				<button
					form="reset_password_form"
					className={classFormatter(
						"c_reset__button",
						"c_reset__button--blue",
					)}
					onClick={ () => this.resetPassword() }
					type="button">
					submit
				</button>
			</div>
		)
	}
}

export default Reset