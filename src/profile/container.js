import { connect } from 'react-redux'

import { deleteUserInfo } from '../login/actionEmitters'
import Profile from './Profile'

const mapStateToProps = (state, ownProps) => ({
	token: state.login.token,
	username: state.login.username,
})

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(deleteUserInfo()),
})

const ProfileContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile)

export default ProfileContainer

