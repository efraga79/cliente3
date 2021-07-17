import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { isAuthenticated } from './Auth/Auth'

// import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Components/NavBar'
import ContainerBo from './Components/ContainerBo'

import Home from './Pages/Home/Home'
import Bo from './Pages/Backoffice/Bo'
import Binary from './Pages/Backoffice/Binary'
import Linear from './Pages/Backoffice/Linear'
import Call from './Pages/Backoffice/Call'
import ReadCall from './Pages/Backoffice/ReadCall'
import Directs from './Pages/Backoffice/Directs'
import Extract from './Pages/Backoffice/Extract'
import FinancePassword from './Pages/Backoffice/FinancePassword'
import Materials from './Pages/Backoffice/Materials'
import Order from './Pages/Backoffice/Order'
import Password from './Pages/Backoffice/Password'
import PayWithBalance from './Pages/Backoffice/PayWithBalance'
import Profile from './Pages/Backoffice/Profile'
import UpdateWallet from './Pages/Backoffice/UpdateWallet'
import WithdrawalBtc from './Pages/Backoffice/WithdrawalBtc'
import Logout from './Auth/Logout'
import Login from './Auth/Login'
import Forget from './Auth/Forget'
import Indicant from './Auth/Indicant'
import Register from './Auth/Register'
import Resfinpass from './Auth/Resfinpass'
import AuthWithDrawal from './Auth/AuthWithDrawal'
import NoAuthWithDrawal from './Auth/NoAuthWithDrawal'
import Sidebar from './Components/Sidebar/Sidebar';
import { Container } from 'react-bootstrap'

export default function App(){
	const PrivateRoute = ({component: Component, ...rest}) => {
		return (
			<Route {...rest} render={props => (
				isAuthenticated() ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/backoffice/logout', state: { from: props.location } }} />
				)
			)} />
		)
	};

	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/backoffice/logout" component={Logout} />
					<Route exact path="/backoffice/login" component={Login} />
					<Route exact path="/backoffice/forget" component={Forget} />
					<Route exact path="/backoffice/register" component={Register} />
					<Route exact path="/backoffice/authwithdrawal" component={AuthWithDrawal} />
					<Route exact path="/backoffice/noauthwithdrawal" component={NoAuthWithDrawal} />
					<Route exact path="/backoffice/resfinpass/:email/:token" component={Resfinpass} />
					<Route exact path="/:id" component={Indicant} />
					<ContainerBo>
						<NavBar/>
						<Sidebar/>
						<div className="content-body">
							<Container fluid>
								<PrivateRoute exact path="/backoffice/bo" component={Bo} />
								<PrivateRoute exact path="/backoffice/materials" component={Materials} />
								<PrivateRoute exact path="/backoffice/directs" component={Directs} />
								<PrivateRoute exact path="/backoffice/binary" component={Binary} />
								<PrivateRoute exact path="/backoffice/linear" component={Linear} />
								<PrivateRoute exact path="/backoffice/profile" component={Profile} />
								<PrivateRoute exact path="/backoffice/password" component={Password} />
								<PrivateRoute exact path="/backoffice/financepassword" component={FinancePassword} />
								<PrivateRoute exact path="/backoffice/extract" component={Extract} />
								<PrivateRoute exact path="/backoffice/order" component={Order} />
								<PrivateRoute exact path="/backoffice/paywithbalance" component={PayWithBalance} />
								<PrivateRoute exact path="/backoffice/withdrawalbtc" component={WithdrawalBtc} />
								<PrivateRoute exact path="/backoffice/updatewallet" component={UpdateWallet} />
								<PrivateRoute exact path="/backoffice/call" component={Call} />
								<PrivateRoute exact path="/backoffice/readcall" component={ReadCall} />
							</Container>
						</div>
					</ContainerBo>
				</Switch>
			</BrowserRouter>
		</>
	)
} 