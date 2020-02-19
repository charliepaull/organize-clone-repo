import { connect } from 'react-redux'

import Menu from './Menu'

const mapStateToProps = (state,ownProps) => ({
	token: state.login.token,
})

const mapDispatchToProps = (dispatch) => ({
})

const MenuContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Menu)

export default MenuContainer