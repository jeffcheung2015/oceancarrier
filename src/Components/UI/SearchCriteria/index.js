import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { pure, compose } from 'recompose'
import { Card, Select, Grid, TextField, MenuItem } from '@material-ui/core'
import _map from 'lodash/map'

const overrideStyles = theme => ({
  textFieldRoot: {
    position: 'relative',
    top: '50%',
    width: '225px'
  },
  selectRoot: {
    position: 'relative',
    top: '50%',
    width: '200px',
    textAlign: 'left'
  }
})

const SearchCriteria = (props) => {
  const {
    currBlNumber, currStatus,
    classes,
    onTextFieldChange, onSelectChange
  } = props

  return(
    <Card className="Card-searchCriteria-wrapper">
      <div className="div-criteriaField-wrapper">
        <TextField
          classes={{
            root: classes.textFieldRoot
          }}
          onChange={onTextFieldChange}
          name='blNumber'
          placeholder='Bl Number'
          defaultValue=''
          values={currBlNumber}
        />
      </div>
      <div className="div-criteriaField-wrapper">
        <Select
          classes={{
            root: classes.selectRoot
          }}
          onChange={onSelectChange}
          name='status'
          defaultValue=''
          value={currStatus}
          displayEmpty
        >
          <MenuItem disabled value=''>Status</MenuItem>
          {
            _map(['Submitted', 'Pending', 'Onboard'], (elem, idx) => (
              <MenuItem key={`menuItem-${idx}`} value={idx}>{elem}</MenuItem>
            ))
          }
        </Select>
      </div>
    </Card>
  )
}
export default compose(
  withStyles(overrideStyles),
  pure
)(SearchCriteria);

SearchCriteria.protoTypes = {
  currBlNumber: PropTypes.string,
  currStatus: PropTypes.number,
  onTextFieldChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired
}
