import React from 'react'
import * as classFormatter from 'classnames'

import LoginContainer from '../../login/container'
import './account.scss'

const AccountFragment = ({username, token, logout}) => (
	<React.Fragment>
		{ !token && (
			<LoginContainer no_redirect />
		)}
		{ token && (
		 <div className="c_account">
		  	<p className="c_account__text">
		 		posting as 
		 		<span className="c_account__text__username">
		 			@{username}
		 		</span>
		 	</p>		 		
		 	<button 
		 		className={classFormatter(
		 			"c_account__logout-button",
		 			"c_account__logout-button--blue"
		 		)}
		 		onClick={ () => logout() }>
		 		log out
		 	</button>
		 </div>
		)}
	</React.Fragment>
)

export default AccountFragment