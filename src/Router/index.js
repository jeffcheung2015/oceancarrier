import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

import { connect } from 'react-redux';
import { startLoading, stopLoading } from "Reducer/UI/UIActions";
import { bindActionCreators } from 'redux';

import { LoginPageContainer } from 'Components/Page/LoginPage';
import { HomePageContainer } from 'Components/Page/HomePage';

import NotFoundPage from 'Components/Page/NotFoundPage';

import { routeName } from "Utils/constant";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
        {...rest}
        render={props => (
          rest.isLogin ? (<Component {...props} />)
          : <Redirect
            to={{
              pathname: routeName.LOGIN,
              state: { from: props.location }
            }}
          />
        )}
      />
  )
}

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>(rest.isLogin ? (
          <Redirect
            to={{
              pathname: routeName.HOME,
              state: { from: props.location }
            }}
          />
        ) : <Component {...props} />
      )}
    />
  )
}

class Router extends Component {
  async componentDidMount(){

    // this.props.startLoading()
    // const access = localStorage.getItem("access")
    // const refresh = localStorage.getItem("refresh")
    // //first verify the existing tokens validity
    // await this.props.verifyJWTToken(access, refresh)
    //
    // if (this.props.isLogin){
    //   //wait until the verification ended, and if the current state is logged on then get the corresponding user
    //   await this.props.getAuthUser(access)
    // }
    // this.props.stopLoading()
  }

  render() {
    const {
      isLogin
    } = this.props
    return (
      <>
        <Switch>
          <PrivateRoute isLogin={isLogin} path={routeName.HOME} exact component={HomePageContainer} />
          <PublicRoute isLogin={isLogin} path={routeName.LOGIN} component={LoginPageContainer} />
          <Route component={NotFoundPage} />
        </Switch>
      </>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      isLogin: state.userReducer.isLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({startLoading, stopLoading}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
