import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import LoginForm from 'Components/Form/LoginForm'

class LoginPage extends React.Component{

  render(){
    return(
      <div className="div-loginPage-wrapper">
        <LoginForm

        />
      </div>
    )
  }
}



export default LoginPage;

LoginPage.protoTypes = {
}
