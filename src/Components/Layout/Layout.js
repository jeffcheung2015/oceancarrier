import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import Router from 'Router'
import GlobalHeader from 'Components/Layout/GlobalHeader'
import Loader from 'Components/Layout/Loader'

class Layout extends React.Component{

  render(){
    const {
      isLoading,
    } = this.props
    return(
      <div className="div-layout-wrapper">
        <GlobalHeader />
        <div className="div-content-wrapper">
          {isLoading && <Loader />}
          <Router />
        </div>
      </div>
    )
  }
}



export default Layout;

Layout.protoTypes = {
}
