import React, { useRef, useState } from 'react';
import axios from "axios";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import FsaSistemas from './FsaSistemas';
const BuscarFsa = () => {
  const toast = useRef(null);
  const onUpload = () => {
      toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
  }
  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    // Select the very first file from list
    var fileToLoad = event.files[0];
    // FileReader function for read the file.
    var fileReader = new FileReader();
    var base64;
    // Onload of file read the file content
    fileReader.onload = function(fileLoadedEvent) {
        base64 = fileLoadedEvent.target.result;
        // Print data in console
        base64=base64.replace('data:application/pdf;base64,','');
        //axios.post("http://localhost:8088/desa/bd/crud_mysql.php", { opcion: 7,imagen:base64}).then((response) => console.log(response.data));
        console.log(base64);
        /*CONVERT BLOB*/
        var binary = atob(base64.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        // create the blob object with content-type "application/pdf"               
        var blob = new Blob( [view], { type: "application/octet-binary" });
        var url = URL.createObjectURL(blob);
        console.log(blob);
        
        
        //convertBlobToBase64(blob);
    };
    // Convert data to base64
    fileReader.readAsDataURL(fileToLoad); 
    //axios.post("http://localhost:8088/desa/bd/crud_mysql.php", { opcion: 8}).then((response) => console.log(response.data));
  }
  const convertBlobToBase64=(blob)=>{
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64String = reader.result;
      console.log(base64String);
    }
  };
  const view_sub=(array)=>{

  }
  const view=()=>{
    const ar=[];
    var aux="";
    axios
    .post("http://localhost:8088/desa/bd/crud_mysql.php", 
    { opcion: 9})
    .then((response) => {
      const sis=response.data
      aux = sis.map(item => `<li>${item['nomb_sist']}</li>`);
      document.getElementById("pi").innerHTML=aux;
      console.log(aux);
    });
    console.log(ar.length);
      console.log(aux);
  }
  
  return (
    <div className="card">
      <h5>Advanced</h5>
      <FileUpload 
        name="demo[]" 
        url="https://primefaces.org/primereact/showcase/upload.php" 
        onUpload={onUpload} 
        accept="pdf/*" 
        maxFileSize={1000000}
        customUpload 
        uploadHandler={customBase64Uploader}
        emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
      <div id="pi">
       {view()}
      </div>
    </div>
  )
}

export default BuscarFsa