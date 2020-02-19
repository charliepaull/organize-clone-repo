import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './app.scss'

import HeaderContainer from '../header/container'
import Home from '../home/Home'
import LoginContainer from '../login/container'
import RequestResest from '../login/RequestReset'
import Reset from '../login/Reset'
import About from '../about/About'
import MenuContainer from '../menu/container'
import PostContainer from '../post/container'
import Donate from '../donate/Donate'
import Complaints from '../complaints/Complaints'
import Complaint from '../complaints/Complaint'
import ProfileContainer from '../profile/container'
import Footer from '../footer/Footer'
import Departments from '../departments/Departments'
import DepartmentPreview from '../departments/DepartmentPreview'
import Department from '../departments/Department'
import TermsOfService from './TermsOfService'
import Privacy from './Privacy'
import Analytics from '../analytics/Analytics'

const routes = [
	{
		path: '/terms_of_service',
		component: TermsOfService,
	},
	{
		path: '/privacy',
		component: Privacy,
	},
	{
		path: '/home',
		component: Home,
	},
	{
		path: '/about',
		component: About,
	},
	{
		path: '/login',
		component: LoginContainer,
		props: { //additional props to pass to the components Route wrapper
			exact: true,
		},
	},
	{
		path: '/login/request_reset',
		component: RequestResest,
	},
	{
		path: '/login/reset/:username/:token',
		component: Reset,
	},
	{
		path: '/menu',
		component: MenuContainer,
	},
	{
		path: '/post',
		component: PostContainer,
	},
	{
		path: '/donate',
		component: Donate,
	},
	{
		path: '/complaints',
		component: Complaints,
	},
	{
		path: '/complaint/:pk',
		component: Complaint,
	},
	{
		path: '/departments',
		component: Departments,
	},
	{
		path: '/department/:pk',
		component: Department,
	},
	{
		path: '/profile',
		component: ProfileContainer,
	},
	{
		path:'/department-preview',
		component: DepartmentPreview,
	}
]

function App() {
  return (
    <Router>
    	<div className="c_app">
			<HeaderContainer />
			<Switch>
				{ routes.map( (item,index) => (
					<Route
						key={index}
						path={item.path}
						{...item.props}
						render={ (routeProps) => (
							React.createElement(item.component,routeProps)
						)}>
					</Route>
				))}
			</Switch>
			<Footer />
			<Analytics />
		</div>
    </Router>
  );
}

export default App;
