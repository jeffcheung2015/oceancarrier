import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import { DashboardContainer } from 'Components/UI/Dashboard'

const HomePage = (props) => {
  return(
    <div className="div-homePage-wrapper">
      <DashboardContainer
        {...props}
      />
    </div>
  )
}

export default HomePage;

HomePage.protoTypes = {
}
