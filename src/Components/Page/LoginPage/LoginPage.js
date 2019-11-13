import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import LoginForm from 'Components/Form/LoginForm'

const LoginPage = (props) => {
  return(
    <div className="div-loginPage-wrapper">
      <LoginForm />
    </div>
  )
}

export default React.memo(LoginPage)

LoginPage.protoTypes = {
}
