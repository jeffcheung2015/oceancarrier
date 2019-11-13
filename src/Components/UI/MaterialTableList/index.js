import React, { Component, useState, useCallback } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { Card, Dialog, DialogTitle, DialogContent, TextField,
   DialogActions, Select, MenuItem, Button, Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import tableIcons from './TableIcons'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CreateIcon from '@material-ui/icons/Create';
import _map from 'lodash/map'
import _clone from 'lodash/clone'
import DropzoneDisplay from 'Components/UI/DropzoneDisplay'
import uuidv4 from 'uuid/v4'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  textFieldRoot:{
    width: '220px'
  },
  selectRoot: {
    width: '200px'
  },
  dialogTitleRoot: {
    textAlign: 'center',
    height: '20%',
    boxSizing: 'border-box'
  },
  dialogContentRoot: {
    display: 'inline-grid',
    width: '100%',
    height: '60%',
    boxSizing: 'border-box'
  },
  dialogActionsRoot:{
    height: '20%',
    boxSizing: 'border-box'
  },
  buttonRoot: {
    width: '20%',
    background: '#999',
    textTransform: 'none',
    color: '#fff',
    marginRight: '20px'
  }
}))

const statusToStr = ['Arrived Depot', 'Delivered', 'Onboard']

const MaterialTableList = (props) => {
  const {
    data, onboardCount, queryData, isDirtyCriteria,
    updateData, updateQueryData, updateOnboardCount
  } = props

  const classes = useStyles()

  const [isTableLoading, setIsTableLoading] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [currRowId, setCurrRowId] = useState(-1)
  const [currBlNumber, setCurrBlNumber] = useState('')
  const [currStatus, setCurrStatus] = useState(-1)
  const [files, setFiles] = useState([])

  const handleUploadOpen = useCallback(() => setUploadOpen(true), [])
  const handleUploadClose = useCallback(() => setUploadOpen(false), [])

  const handleUpdateOpen = useCallback((currRow) => {
    setCurrRowId(currRow.tableData.id)
    setCurrBlNumber(currRow.blNumber)
    setCurrStatus(currRow.status)
    setUpdateOpen(true)
  }, [])

  const handleUpdateClose = useCallback(() => setUpdateOpen(false), [])

  const onUploadBtnClick = useCallback((e) => {
      // drive.files.create({
    //   resource: fileMetadata,
    //   media: {
    //     body:
    //   },
    //   fields: uuidv4()
    // }, function (err, file) {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log('File Id: ', file.id);
    //   }
    // });
  }, [files])


  const onUpdateBtnClick = useCallback((e) => {
    let newOnboard = onboardCount
    let newData = _map(data, (elem, idx) => {
      if(idx === currRowId){
        if(elem.status === 2 && currStatus !== 2){
          newOnboard -= 1
        }else if (elem.status != 2 && currStatus == 2) {
          newOnboard += 1
        }
        return {
          blNumber: currBlNumber,
          status: currStatus,
          tableData: elem.tableData
        }
      }else{
        return elem
      }
    })

    let newQueryData = _map(queryData, (elem, idx) => {
      if(idx === currRowId){
        return {
          blNumber: currBlNumber,
          status: currStatus,
          tableData: elem.tableData
        }
      }else{
        return elem
      }
    })

    setIsTableLoading(true)
    updateData(newData)
    updateQueryData(newQueryData)
    if(newOnboard !== onboardCount){
      updateOnboardCount(newOnboard)
    }
    setUpdateOpen(false)
    setTimeout(() => setIsTableLoading(false), 600)
  }, [
    currRowId, currBlNumber, currStatus, data, queryData, onboardCount,
    updateData, updateQueryData, updateOnboardCount
  ])

  const actions = [
    {
      icon: () => <CloudUploadIcon />,
      tooltip: 'Upload Document',
      onClick: handleUploadOpen,
      hidden: true
    },
    {
      icon: () => <CreateIcon />,
      tooltip: 'Update Shipment',
      onClick: (props, currRow) => {
        handleUpdateOpen(currRow)
      }
    },
  ]

  const columns = [
    { title: '', field: 'upload',
      headerStyle: { width: '20px' },
      cellStyle: {
        width: '20px',
        position: 'relative',
        left: '-50px',
        padding: '0px'
      },
      render: (rowData) => {
        if (rowData.status == 2){
          return (
            <Tooltip title="Upload Document" onClick={handleUploadOpen}>
              <IconButton >
                <CloudUploadIcon />
              </IconButton>
            </Tooltip>
          )
        }
      }
    },
    { title: 'BL Number', field: 'blNumber' },
    { title: 'Status', field: 'status', initialEditValue: -1, editable: 'onAdd',
      editComponent: (props) => {
        return (
          <Select className="Select-materialTable"
            classes={{ root: classes.selectRoot }}
            onChange={(e) => props.onChange(e.target.value)}
            value={props.value}
            defaultValue={-1}
            displayEmpty
          >
            <MenuItem disabled value={-1}>Status</MenuItem>
            {
              _map(['Arrived Depot', 'Delivered', 'Onboard'], (elem, idx) => (
                <MenuItem key={`s-${idx}`} value={idx}>{elem}</MenuItem>
              ))
            }
          </Select>
        )
      },
      render: (rowData) => {
        const cellStr = rowData.status >= 0 && rowData.status < statusToStr.length ?
          statusToStr[rowData.status] : 'N/A'
        return <div>{cellStr}</div>
      }
    },
  ]

  return (
    <Card className="Card-materialTable-wrapper">
      <MaterialTable
        isLoading={isTableLoading}
        style={{padding: '20px'}}
        actions={actions}
        icons={tableIcons}
        title="Shipment"
        columns={columns}
        data={isDirtyCriteria ? queryData : data}
        editable={{
          onRowAdd: (newRow) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                let newData = _clone(data)
                newData.push({...newRow, tableData: {id: data.length}})
                updateData(newData)
                if(newRow.status === 2){
                  updateOnboardCount(onboardCount + 1)
                }
              }, 600);
            }),
          }
        }
      />

      <Dialog
        open={uploadOpen}
        onClose={handleUploadClose}
      >
        <div className="div-uploadDocument-modal">
          <DialogTitle classes={{root: classes.dialogTitleRoot}}>
            Document Upload
          </DialogTitle>
          <DialogContent classes={{root: classes.dialogContentRoot}}>
            <DropzoneDisplay
              files={files}
              setFiles={setFiles}
            />
          </DialogContent>
          <DialogActions classes={{root: classes.dialogActionsRoot}}>
            <Button onClick={onUploadBtnClick} classes={{root: classes.buttonRoot}}>Upload</Button>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog
        open={updateOpen}
        onClose={handleUpdateClose}
      >
        <div className="div-updateShipment-modal">
          <DialogTitle classes={{root: classes.dialogTitleRoot}}>
            Update Shipment
          </DialogTitle>
          <DialogContent classes={{root: classes.dialogContentRoot}}>
            {
              <>
                <div className="div-updateShipmentField">
                  <div className="div-fieldLabel">Bill of lading number</div>
                  <TextField
                    classes={{ root: classes.textFieldRoot }}
                    onChange={e => setCurrBlNumber(e.target.value)}
                    value={currBlNumber}
                  />
                </div>
                <div className="div-updateShipmentField">
                  <div className="div-fieldLabel">Shipment status</div>
                  <Select
                    classes={{ root: classes.selectRoot }}
                    onChange={e => setCurrStatus(e.target.value)}
                    defaultValue={-1}
                    value={currStatus}
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
              </>
            }
          </DialogContent>
          <DialogActions classes={{root: classes.dialogActionsRoot}}>
            <Button
              classes={{root: classes.buttonRoot}}
              onClick={onUpdateBtnClick}
            >Confirm</Button>
          </DialogActions>
        </div>
      </Dialog>

    </Card>
  )
}

export default MaterialTableList

MaterialTableList.protoTypes = {
  data: PropTypes.array.isRequired,
  queryData: PropTypes.array.isRequired,
  onboardCount: PropTypes.number.isRequired,
  updateData: PropTypes.func.isRequired,
  updateOnboardCount: PropTypes.func.isRequired
}
