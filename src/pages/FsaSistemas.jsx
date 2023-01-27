import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FileUpload } from 'primereact/fileupload';
import { Button } from "primereact/button";
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
    /*
        var archivo = event.files[0];
        let archivoNombre=archivo.name;
        let xhr=new XMLHttpRequest();
        xhr.open("POST","http://172.20.106.185:8088/desa/bd/prueba.php");
        var datos = new FormData();
        datos.append("file", archivo);
        xhr.send(datos);
        
        console.log(file);
        var reader = new FileReader();
        reader.addEventListener('load', readFile);
        reader.readAsText(file);
        */
      /*
      formData.append("image", imagefile.files[0]);
        axios.post(conexion,{opcion:33}, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })*/
      /*BLOB :/
      const reader = new FileReader();
        reader.onload = function(e) {
            const blob = new Blob([new Uint8Array(e.target.result)], {type: file.type });
            console.log(blob);
            axios.post(conexion, 
              { opcion: 31,id_deta:entidad.id_deta,pdf_imagen:blob},
            )
            .then((response) => console.log(response.data));
        };
        reader.readAsArrayBuffer(file);
        */
          /*
          //guardar
          axios.post(conexion, 
            { opcion: 31,id_deta:entidad.id_deta,pdf_imagen:blob})
          .then((response) => console.log(response.data));
          */
         /*
          axios.post(conexion, 
            { opcion: 32,id_deta:entidad.id_deta})
          .then((response) => console.log(response.data));
          */
          const name='FSA-TANIA VANESSA HUARANCCA PERALTA-367-1-1.pdf';  
          const prue=()=>{
            axios.post("http://localhost:8088/desa/bd/downloadFile.php",
            { opcion: name,}).then((response) => {
              console.log(response)
              const tempLink = document.createElement('a');
              tempLink.href = response.data;
              tempLink.click();
            });     
          };
          
          const generar=()=>{
            axios.get('https://vpn.sunarp.gob.pe/api/v1/configuration/users/user-realms/realm/realm_zrx', {
              auth: {
                username: "adm_bflores_zrx",
                password: "Cusco01cusco"
              },
            })
            .then((res) => {
              console.log(res.data)
            })
          };



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
            <Button label="prueba" onClick={prue}></Button>
            <Button label="prueba2" onClick={generar}></Button>
            <a href={"http://localhost:8088/desa/bd/downloadFile.php?opcion="+name}>hi</a>
        </div>
  )
}

export default FsaSistemas