import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import Dashboard from 'Components/UI/Dashboard'

class HomePage extends React.Component{

  render(){
    return(
      <div className="div-homePage-wrapper">
        <Dashboard
          onboardCount={this.props.onboardCount}
          data={this.props.data}
        />
      </div>
    )
  }
}



export default HomePage;

HomePage.protoTypes = {
}
