import ReactGA from 'react-ga'

const initial_state = {
}

const analytics = (state=initial_state, action) => {
	switch (action.type) {
		default:
			ReactGA.initialize("UA-130672703-3", {
				debug: true,
			})
			return state		
	}
}

export default analytics