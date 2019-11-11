import React, { Component, useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone'
import _forEach from 'lodash/forEach'
import _map from 'lodash/map'
import './index.scss'

const DropzoneDisplay = (props) => {
  const {
    files, setFiles
  } = props

  const onDrop = useCallback(acceptedFiles => {
    var tmpFiles = []
    _forEach(acceptedFiles, (file, idx) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        tmpFiles.push(file)
        if(tmpFiles.length == acceptedFiles.length){
          setFiles(tmpFiles)
        }
      }
      reader.readAsArrayBuffer(file)
    })

  }, [])
  console.log('!!', files)
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  // console.log('#### getRootProps:', getRootProps())
  // console.log('@@@ getInputProps:', getInputProps())
  // console.log('!!!isDragActive:', isDragActive)
  return (
    <div className="div-dropzoneDisplay-wrapper">
      <div className="div-dropzoneRegion" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="div-dropzone-text">Drag and drop files here</div>
      </div>
      <div className="div-fileList">
        {
          files.length == 0 ? (
            <div className="div-fileName">No files</div>
          ) :
          _map(files, (file, idx) => <div key={`filename-${idx}`} className="div-fileName">{file.name}</div>)
        }
      </div>
    </div>
  )
}

export default DropzoneDisplay;

DropzoneDisplay.protoTypes = {
}
