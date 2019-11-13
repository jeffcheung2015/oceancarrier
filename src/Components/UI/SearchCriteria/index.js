import React, { Component, useState, useCallback } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import { pure, compose } from 'recompose'
import { Card, Select, Grid, TextField, Button, MenuItem } from '@material-ui/core'
import _map from 'lodash/map'
import _set from 'lodash/set'
import _forEach from 'lodash/forEach'
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
  const {
    data,
    updateQueryData, setIsDirtyCriteria
  } = props

  const [blNumbers, setBlNumbers] = useState('')
  const [status, setStatus] = useState(-1)

  const onButtonClick = useCallback(() => {
    let [isBlNumbersDirty, isStatusDirty] = [blNumbers !== '', status !== -1]
    if(blNumbers === '' && status === -1){
      setIsDirtyCriteria(false)
      return
    }
    const blNumbersArr = blNumbers.split(',')
    let newQueryData = []
    _forEach(data, (elem, idx) => {
      let blNumberMatch = blNumbersArr.indexOf(elem.blNumber) !== -1
      let statusMatch = status === elem.status

      let cond1 = (isBlNumbersDirty && !isStatusDirty && blNumberMatch)
      let cond2 = (!isBlNumbersDirty && isStatusDirty && statusMatch)
      let cond3 = (isBlNumbersDirty && isStatusDirty && blNumberMatch && statusMatch)
      if (cond1 || cond2 || cond3){
        newQueryData.push(elem)
      }
    })
    setIsDirtyCriteria(true)
    updateQueryData(newQueryData)
  }, [
    blNumbers, status, data, setIsDirtyCriteria, updateQueryData
  ])

  return(
    <Card className="Card-searchCriteria-wrapper">
      <div className="div-criteriaField-wrapper">
        <TextField
          classes={{root: classes.textFieldRoot }}
          onChange={(e) => setBlNumbers(e.target.value)}
          name='blNumbers'
          placeholder='Bl Number'
          value={blNumbers}
        />
      </div>
      <div className="div-criteriaField-wrapper">
        <Select
          classes={{ root: classes.selectRoot }}
          onChange={(e) => setStatus(e.target.value)}
          name='status'
          defaultValue={-1}
          value={status}
          displayEmpty
        >
          <MenuItem value={-1}>Status</MenuItem>
          {
            _map(['Arrived Depot', 'Delivered', 'Onboard'], (elem, idx) => {
              return (
                <MenuItem key={`menuItem-${idx}`} value={idx}>{elem}</MenuItem>
              )
            })
          }
        </Select>
      </div>
      <Button classes={{ root: classes.buttonRoot }} onClick={onButtonClick}>
        Search
      </Button>
    </Card>
  )
}
export default SearchCriteria;

SearchCriteria.protoTypes = {
  data: PropTypes.array.isRequired,
  updateQueryData: PropTypes.func.isRequired,
  setIsDirtyCriteria: PropTypes.func.isRequired,
}
