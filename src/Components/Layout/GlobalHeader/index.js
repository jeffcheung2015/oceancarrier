import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';

const GlobalHeader = (props) => {
  return(
    <div className="div-globalHeader-wrapper">
      <div className="div-headerName-text">Ocean Carrier</div>
    </div>
  )
}

export default React.memo(GlobalHeader)

GlobalHeader.protoTypes = {
}
