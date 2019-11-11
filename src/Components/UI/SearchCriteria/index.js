import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import { pure, compose } from 'recompose'
import { Card, Select, Grid, TextField, Button, MenuItem } from '@material-ui/core'
import _map from 'lodash/map'
import _set from 'lodash/set'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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
  },
  buttonRoot: {
    textTransform: 'none',
    background: '#bdb6b6',
    width: '225px',
    marginBottom: '20px'
  }
}))

const SearchCriteria = (props) => {
  const classes = useStyles();
  const [blNumbers, setBlNumbers] = React.useState('')
  const [status, setStatus] = React.useState(-1)

  const onButtonClick = () => {
    const blNumbersArr = blNumbers.split(',')

    console.log('status, blNumbers', status, blNumbers)
  }
  const onTextFieldChange = (e) => setBlNumbers(e.target.value)
  const onSelectChange = (e) => setStatus(e.target.value)

  return(
    <Card className="Card-searchCriteria-wrapper">
      <div className="div-criteriaField-wrapper">
        <TextField
          classes={{
            root: classes.textFieldRoot
          }}
          onChange={onTextFieldChange}
          name='blNumbers'
          placeholder='Bl Number'
          defaultValue=''
          values={blNumbers}
        />
      </div>
      <div className="div-criteriaField-wrapper">
        <Select
          classes={{
            root: classes.selectRoot
          }}
          onChange={onSelectChange}
          name='status'
          defaultValue={-1}
          value={status}
          displayEmpty
        >
          <MenuItem disabled value={-1}>Status</MenuItem>
          {
            _map(['Arrived Depot', 'Delivered', 'Onboard'], (elem, idx) => {
              return (
                <MenuItem key={`menuItem-${idx}`} value={idx}>{elem}</MenuItem>
              )
            })
          }
        </Select>
      </div>
      <Button
        classes={{
          root: classes.buttonRoot
        }}
        onClick={onButtonClick}
      >
        Search
      </Button>
    </Card>
  )
}
export default SearchCriteria;

SearchCriteria.protoTypes = {
}
