import React from 'react'
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom'
import * as classFormatter from 'classnames'

import './login.scss'

const login_form = [
	{
		type: 'text',
		name: 'username',
		placeholder: 'username',
	},
	{
		type: 'password',
		name: 'password',
		placeholder: 'password',
	}
]

const sign_up_form = [
	{
		type: 'text',
		name: 'username',
		placeholder: 'username'
	},
	{
		type: 'email',
		name: 'email',
		placeholder: 'email'
	},
	{
		type: 'password',
		name: 'password_1',
		placeholder: 'password'
	},
	{
		type: 'password',
		name: 'password_2',
		placeholder: 're-enter password'
	}
]

class Login extends React.Component {
	constructor(props) {
		super(props)

		this.login = this.login.bind(this)
		this.signUp = this.signUp.bind(this)

		this.loginForm = React.createRef()
		this.signUpForm = React.createRef()
	}

	login() {
		let url = "http://18.144.58.32:9191/login/token"
		let form = new FormData(this.loginForm.current)

		fetch(url, {
			method: 'POST',
			body: form,
		})
		.then( res => {
			if (res.ok) {
				res.json()
				.then( data => {
					this.props.login(data.token, form.get('username'))
				})
			} else {
				//how to handle errors with login?
			}
		})
	}

	signUp() {
		let url = "http://18.144.58.32:9191/login/create_user"
		let form = new FormData(this.signUpForm.current)

		//ensure passwords are the same
		let pass1 = form.get('password_1')
		let pass2 = form.get('password_2')
		if (pass1 !== pass2 ) {
			//this is an error!
		}
		fetch(url, {
			method: 'POST',
			body: form,
		})
		.then( res => {
			if (res.ok) {
				res.json()
				.then( data => {
					this.props.login(data.token, form.get('username'))
				})
			} else {
				//more error handling
			}
		})
	}

	render() {
		return (
			<div 
				className={classFormatter(
					"c_login",
					{"c_login--embed": this.props.no_redirect},
				)}>
				{ !this.props.no_redirect && this.props.token && (
					<Redirect to="/profile" />
				)}
				<h2 className="c_login__headline"> 
					Log In 
				</h2>
				<form
					className="c_login__form"
					ref={this.loginForm}
					id="login_form">
					{ login_form.map( (item,index) => (
						<input
							className="c_login__form__input"
							key={index}
							{...item}
						/>
					))}
					<Link
						className="c_login__password-reset-link"
						to="/login/request_reset">
						Forgot your password?
					</Link>
				</form>
				<button
					className={classFormatter(
						"c_login__button",
						"c_login__button--blue"
					)}
					onClick={ () => this.login() }
					type="button">
					login
				</button>
				<h2 className="c_login__headline">
					New? Create an account
				</h2>
				<form
					className="c_login__form"
					ref={this.signUpForm}
					id="signup_form">
					{ sign_up_form.map( (item,index) => (
						<input
							key={index}
							className="c_login__form__input"
							{...item}
						/>
					))}
				</form>
				<button
					className={classFormatter(
						"c_login__button",
						"c_login__button--blue"
					)}
					onClick={ () => this.signUp() }
					type="button">
					create account
				</button>
			</div>
		)
	}
}

export default Login

