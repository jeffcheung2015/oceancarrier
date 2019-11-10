import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import InfoDisplay from 'Components/UI/InfoDisplay'
import { Card, Grid } from '@material-ui/core'
import MaterialTableList from 'Components/UI/MaterialTableList';
import { Field, reduxForm, reset } from 'redux-form'
import SearchCriteria from 'Components/UI/SearchCriteria'

class Dashboard extends React.Component{

  render(){
    const{
      onboardCount, data
    } = this.props

    return(
      <div className="div-dashboard-wrapper">
        <Grid container spacing={3}>

          <Grid item xs={12} sm={8} md={8} lg={8}>
            <SearchCriteria

            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <InfoDisplay
              infoLabel={'Number of Onboard Shipment'}
              countInfo={onboardCount}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MaterialTableList
              data={data}
            />
          </Grid>

        </Grid>
      </div>
    )
  }
}

export default Dashboard;

Dashboard.protoTypes = {
}
