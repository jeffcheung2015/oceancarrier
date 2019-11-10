import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from './Layout'
import { stopLoading } from 'Reducer/UI/UIActions'

class LayoutContainer extends React.Component{
  async componentDidMount(){
    setTimeout(() => {
      this.props.stopLoading()
    }, 500)
  }
  
  render(){
    return(
      <Layout
        {...this.props}
      />
    )
  }
}

// const mapStateToProps = (state) => {
//     return {
//
//     };
// };

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ stopLoading }, dispatch)
};

export default compose(
  connect(null, mapDispatchToProps),
)(LayoutContainer);

LayoutContainer.protoTypes = {
}
