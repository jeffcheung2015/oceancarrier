import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { Card, Grid, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import { compose, pure } from 'recompose'
import { withStyles } from '@material-ui/styles';
import tableIcons from './TableIcons'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Modal from '@material-ui/core/Modal';

const overrideStyles = theme => ({
})

const MaterialTableList = (props) => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'BL Number', field: 'blNumber' },
      { title: 'Status', field: 'status' },
    ],
  });

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const actions = [
    {
      icon: () => <CloudUploadIcon />,
      tooltip: 'Upload Document',
      onClick: (event, rowData) => {
        handleOpen()
      }
    }
  ]

  const onChangePage = () => {
    console.log(3)
  }

  const {
    data, classes
  } = props

  return (
    <Card className="Card-materialTable-wrapper">
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <div className="div-uploadDocument-modal">
          <DialogTitle>Drag and drog to upload</DialogTitle>
          <DialogContent>

          </DialogContent>
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
                  if (oldData) {
                    setState(prevState => {
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

export default compose(
  withStyles(overrideStyles),
  pure
)(MaterialTableList)

MaterialTableList.protoTypes = {
  data: PropTypes.object.isRequired
}
