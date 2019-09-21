import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as GDS from "./../../../../libs/converter";


export function MyDropzone( props ) {

  const gridDataService = new GDS.GridDataService();

  let dataJSON;

  const onDrop = useCallback(acceptedFiles => {
    
    props.docUploadStarted();

    gridDataService.loadExcel(acceptedFiles[0])
      .then((gridModel) => gridModel.toJson())
      .then(json => {
        dataJSON = json;
        props.docUploadHandler(dataJSON);

      });
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="ca-drop-zone">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop an xslx file here, or click to select the file</p>
        }
      </div>
    </div>
  )
}