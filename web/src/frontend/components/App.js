import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
const PageNotFound = React.lazy(() => import("./common/PageNotFound"));
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../actions/user";
import axios from "axios";
import Landing from "./Landing";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { bindActionCreators } from "redux";

class App extends Component {
	constructor(props) {
		super(props);
		axios.defaults.withCredentials = true;
		const { clearUser, history } = this.props;
		window.addEventListener("storage", (e) => {
			if (e.newValue == "false") {
				clearUser();
				history.push("/");
			}
		});
		this.state = {
			isVerifying: true,
		};
	}
	async componentDidMount() {
		const result = await this.props.setUser();
		if (result) {
			this.setState({ isVerifying: false });
		} else {
			this.setState({ isVerifying: false });
		}
	}

	render() {
		const { userId } = this.props;
		return (
			<div className='h-full'>
				<Suspense fallback={<div className='loader'></div>}>
					{this.state.isVerifying ? (
						<div>Loading</div>
					) : (
						<>
							<Switch>
								<Route
									path='/'
									render={() => <Landing {...this.props} />}
									exact
								/>
								<Route
									path='/login'
									render={() =>
										userId === "" ? (
											<Login {...this.props} />
										) : (
											<Dashboard {...this.props} />
										)
									}
								/>
								<Route
									path='/admin/dashboard'
									render={() =>
										userId === "" ? (
											<Login {...this.props} />
										) : (
											<Dashboard {...this.props} />
										)
									}
								/>
								<Route path='*' component={PageNotFound} />
							</Switch>
						</>
					)}
				</Suspense>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		token: state.user.token,
		userId: state.user._id,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setUser }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
