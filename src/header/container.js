import { connect } from 'react-redux'

import Header from './Header'

const mapStateToProps = (state, ownProps) => ({
	token: state.login.token,
	username: state.login.username,
})

const mapDispatchToProps = (dispatch) => ({
})

const HeaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)

export default HeaderContainer