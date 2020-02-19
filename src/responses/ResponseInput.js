import React, { useState, useRef } from 'react'

const ResponseInput = ({token, complaint, updateResponses}) => {
	const [ text, setText ] = useState('')
	const responseForm = useRef()

	const submitResponse = () => {
		const url = "http://18.144.58.32:9191/apiv2/responses"

		let data = new FormData(responseForm.current)
		fetch(url, {
			method: 'POST',
			body: data,
			headers: {
				'Authorization': "Token " + token
			}
		})
		.then( res => {
			if (res.ok) {
				res.json()
				.then( data => {
					updateResponses(data)
					setText('')
				})
			}
		})
	}

	return (
		<div className="c_response-input">
			<form
				ref={responseForm}
				id="response-input-form">
				<textarea
					name="description"
					placeholder="Enter your response"
					value={text}
					onChange={(event) => setText(event.target.value)}
					className="c_response-input__text">
				</textarea>
				<input 
					type="hidden"
					name="complaint"
					value={complaint}
				/>
				<button
					className="c_response-input__button"
					type="button"
					form="response-input-form"
					onClick={submitResponse}>
					submit
				</button>
			</form>
		</div>
	)
}

export default ResponseInput