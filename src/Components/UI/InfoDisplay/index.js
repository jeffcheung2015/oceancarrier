import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { pure, compose } from 'recompose'

const overrideStyles = theme => ({

})

const InfoDisplay = (props) => {
  const {
    countInfo, infoLabel
  } = props

  return(
    <Card className="Card-infoDisplay-wrapper">
      <div className="div-infoTypography-wrapper">
        <Typography variant="subtitle1">{infoLabel}</Typography>
        <Typography variant="h1">{countInfo}</Typography>
      </div>
    </Card>
  )
}
export default compose(
  withStyles(overrideStyles),
  pure
)(InfoDisplay);

InfoDisplay.protoTypes = {
  infoLabel: PropTypes.string.isRequired,
  countInfo: PropTypes.number.isRequired
}
