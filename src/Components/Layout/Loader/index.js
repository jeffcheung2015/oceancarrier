import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    animationDuration: '0.4s'
  }
}))

const Loader = () => {
  const classes = useStyles()

  return(
    <div className="div-loader-wrapper">
      <div className="div-loader-cover"/>
      <div className="div-circularProgress-wrapper">
        <CircularProgress
          classes={{
            root: classes.root
          }}
        />
      </div>
    </div>
  )
}

export default Loader;

Loader.protoTypes = {
}
