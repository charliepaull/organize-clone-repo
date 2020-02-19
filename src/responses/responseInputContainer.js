import { connect } from 'react-redux'

import ResponseInput from './ResponseInput'

const mapStateToProps = (state, ownProps) => ({
	token: state.login.token,
	...ownProps
})

const mapDispatchToProps = (dispatch) => ({
})

const ResponseInputContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ResponseInput)

export default ResponseInputContainer