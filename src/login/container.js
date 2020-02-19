import { connect } from 'react-redux'
import {
	updateUserInfo,
	deleteUserInfo,
} from './actionEmitters'
import Login from './Login'

const mapStateToProps = (state, ownProps) => ({
	token: state.login.token,
	...ownProps,
})

const mapDispatchToProps = (dispatch) => ({
	login: (token,username) => dispatch(updateUserInfo(token,username)),
	logout: () => dispatch(deleteUserInfo()),
})

const LoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Login)

export default LoginContainer