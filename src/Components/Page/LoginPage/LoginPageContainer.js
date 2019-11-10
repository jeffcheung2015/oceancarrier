import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginPage from './LoginPage'

class LoginPageContainer extends React.Component{

  render(){
    return(
      <LoginPage />
    )
  }
}

const mapStateToProps = (state) => {
    return {
      isLogin: state.userReducer.isLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ }, dispatch)
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(LoginPageContainer);

LoginPageContainer.protoTypes = {
}
