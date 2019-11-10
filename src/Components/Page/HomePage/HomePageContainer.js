import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomePage from './HomePage'
import DummyData from 'DummyData/DummyData.json'

class HomePageContainer extends React.Component{
  state = {
    data: [],
    onboardCount: 0
  }

  async componentDidMount(){
    // to be replaced
    await this.setState({
      data: DummyData.data,
      onboardCount: DummyData.onboardCount
    })
  }

  render(){
    return(
      <HomePage
        {...this.state}
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
