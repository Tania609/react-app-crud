import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FileUpload } from 'primereact/fileupload';
const FsaSistemas = () => {
  const customBase64Uploader = async (event) => {
    var file = event.files[0];
    console.log(file);
    const data=new FormData();
    data.append('archivo',file);
    console.log(data);
    axios.post("http://localhost:8088/desa/bd/imagen.php", data,
    {
      'Content-Type': 'multipart/form-data'
    }).then((response) => console.log(response));
  }
    

  return (
    <div  className="field" key="file_fsa">
            <p>Subir FSA Firmado</p>
            <FileUpload 
            name="archivo"
            multiple="multiple"
            accept="pdf/*" 
            maxFileSize={1000000}
            customUpload 
            uploadHandler={customBase64Uploader}
            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
        </div>
  )
}

export default FsaSistemas