import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomePage from './HomePage'

class HomePageContainer extends React.Component{

  render(){
    return(
      <HomePage
        {...this.props}
      />
    )
  }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ }, dispatch)
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(HomePageContainer);

HomePageContainer.protoTypes = {
}
