import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
const PageNotFound = React.lazy(() => import("./common/PageNotFound"));
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { setUser, clearUser } from "../actions/user";
import axios from "axios";
import Landing from "./Landing";

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
  }
//   async componentDidMount() {
//     const { setUser, history, token, location } = this.props;
//     let isLogin = await setUser();
//     if (!isLogin) {
//       history.push("/");
//     } else {
//       if (
//         // token &&
//         // token != "" &&
//         ["/login", "/signup", "/"].includes(location.pathname)
//       ) {
//         history.push("/main");
//       }
//     }
//   }

  render() {
    // const { token } = this.props;
    return (
      <>
        <Suspense fallback={<div className="loader"></div>}>
          <Switch>
          <Route
              path="/"
              render={() => <Landing {...this.props} />}
              exact
            />
            {/* <Route path="/main" render={() => <Main {...this.props} />} exact />
            <Route
              path="/"
              token={token}
              render={() => <Landing {...this.props} />}
              exact
            /> */}
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     token: state.user.token,
//     userId: state.user._id,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ setUser, clearUser }, dispatch);
// }

export default withRouter(connect(null, null)(App));
