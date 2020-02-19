import { connect } from 'react-redux'

import {
	deleteUserInfo,
} from '../login/actionEmitters'
import Post from './Post'

const mapStateToProps = (state, ownProps) => ({
	username: state.login.username,
	token: state.login.token,
})

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(deleteUserInfo()),
})

const PostContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Post)

export default PostContainer