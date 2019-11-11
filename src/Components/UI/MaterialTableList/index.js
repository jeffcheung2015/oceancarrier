import React, { Component, useState, useCallback } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { Card, Grid, Dialog, DialogTitle, DialogContent,
   DialogContentText, DialogActions, Select, MenuItem, Button } from '@material-ui/core'
import { compose, pure } from 'recompose'
import { makeStyles } from '@material-ui/core/styles'
import tableIcons from './TableIcons'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Modal from '@material-ui/core/Modal';
import _map from 'lodash/map'
import DropzoneDisplay from 'Components/UI/DropzoneDisplay'
import uuidv4 from 'uuid/v4'
import axios from 'axios'

// drive.files.create({
//   resource: fileMetadata,
//   media: {
//     body:
//   },
//   fields: uuidv4()
// }, function (err, file) {
//   if (err) {
//     // Handle error
//     console.error(err);
//   } else {
//     console.log('File Id: ', file.id);
//   }
// });
const useStyles = makeStyles(theme => ({
  dialogTitleRoot: {
    textAlign: 'center',
    height: '20%',
    boxSizing: 'border-box'
  },
  dialogContentRoot: {
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
    color: '#fff'
  }
}))

const statusToStr = ['Arrived Depot', 'Delivered', 'Onboard']


const MaterialTableList = (props) => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'BL Number', field: 'blNumber' },
      { title: 'Status', field: 'status',
        editComponent: () => (
          <Select className="Select-materialTable">
            <MenuItem disabled value={-1}>Status</MenuItem>
            {
              _map(['Arrived Depot', 'Delivered', 'Onboard'], (elem, idx) => (
                <MenuItem key={`menuItem-${idx}`} value={idx}>{elem}</MenuItem>
              ))
            }
          </Select>
        ),
        render: (rowData) => {
          const cellStr = rowData.status >= 0 && rowData.status < statusToStr.length ?
            statusToStr[rowData.status] : 'N/A'
          return <div>{cellStr}</div>
        }
      },
    ],
  });

  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState([])
  const classes = useStyles()
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const actions = [
    {
      icon: () => <CloudUploadIcon />,
      tooltip: 'Upload Document',
      onClick: (event, rowData) => {
        handleOpen()
      }
    }
  ]

  const onChangePage = useCallback(() => {
    console.log("@@@")
    console.log(files)
  }, [])

  const {
    data,
  } = props
  console.log(files)
  return (
    <Card className="Card-materialTable-wrapper">
      <Dialog
        open={open}
        onClose={handleClose}
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
            <Button classes={{root: classes.buttonRoot}}>Upload</Button>
          </DialogActions>
        </div>
      </Dialog>


      {
        <MaterialTable
          style={{padding: '20px'}}
          actions={actions}
          onChangePage={onChangePage}
          icons={tableIcons}
          title="Shipment"
          columns={state.columns}
          data={data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setState(prevState => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  console.log("####", oldData, newData)
                  if (oldData) {
                    setState(prevState => {
                      console.log("@@@@", prevState, prevState.data)
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            }
          }

        />
      }

    </Card>
  )
}

export default MaterialTableList

MaterialTableList.protoTypes = {
  data: PropTypes.object.isRequired
}
