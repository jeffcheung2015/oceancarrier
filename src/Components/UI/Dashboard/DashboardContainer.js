import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { updateData, updateQueryData, updateOnboardCount, initialFetchData } from 'Reducer/TmpDb/TmpDbActions'
import DummyData from 'DummyData/DummyData.json'
import _filter from 'lodash/filter'

class DashboardContainer extends React.Component{

  componentDidMount(){
    // Fetch the dummydata from json file and store them into redux store
    // using redux store as a database
    let onboardCount = _filter(DummyData.data, (rowData, idx) => {
      if(rowData.status === 2){ return rowData }
    }).length
    this.props.initialFetchData(DummyData.data, onboardCount)
  }

  render(){
    return(
      <Dashboard
        {...this.props}
      />
    )
  }
}

const mapStateToProps = (state) => {
    return {
      data: state.tmpDbReducer.data,
      queryData: state.tmpDbReducer.queryData,
      onboardCount: state.tmpDbReducer.onboardCount
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      updateData, updateOnboardCount, updateQueryData, initialFetchData
    }, dispatch)
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(DashboardContainer);

DashboardContainer.protoTypes = {
  onboardCount: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  updateOnboardCount: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
}
