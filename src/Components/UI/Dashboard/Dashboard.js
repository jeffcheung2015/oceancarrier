import React, { Component, useState } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import InfoDisplay from 'Components/UI/InfoDisplay'
import { Card, Grid } from '@material-ui/core'
import MaterialTableList from 'Components/UI/MaterialTableList';
import { Field, reduxForm, reset } from 'redux-form'
import SearchCriteria from 'Components/UI/SearchCriteria'

const Dashboard = props => {

  const [isDirtyCriteria, setIsDirtyCriteria] = useState(false)

  const{
    onboardCount, data, queryData,
    updateOnboardCount, updateData, updateQueryData
  } = props

  return(
    <div className="div-dashboard-wrapper">
      <Grid container spacing={3}>

        <Grid item xs={12} sm={7} md={7} lg={7}>
          <SearchCriteria
            data={data}
            updateQueryData={updateQueryData}
            setIsDirtyCriteria={setIsDirtyCriteria}
          />
        </Grid>

        <Grid item xs={12} sm={5} md={5} lg={5}>
          <InfoDisplay
            infoLabel={'Number of Onboard Shipment'}
            countInfo={onboardCount}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <MaterialTableList
            data={data}
            queryData={queryData}
            isDirtyCriteria={isDirtyCriteria}
            onboardCount={onboardCount}
            updateData={updateData}
            updateQueryData={updateQueryData}
            updateOnboardCount={updateOnboardCount}
          />
        </Grid>

      </Grid>
    </div>
  )
}

export default Dashboard;

Dashboard.protoTypes = {
  onboardCount: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  updateOnboardCount: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
}
