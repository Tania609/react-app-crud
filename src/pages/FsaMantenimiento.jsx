import { Column } from "primereact/column";
import React, { useState, useEffect, useRef } from "react";
import DataTableComponent from "../component/DataTableComponent";
import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import DialogComponent from "../context/DialogComponent";
import { PDFDownloadLink} from '@react-pdf/renderer';
import CargoFsa from "../reports/CargoFsa";
export const FsaMantenimiento = () => {
    const conexion="http://172.20.106.185:8088/desa/bd/crud_uti.php";
    const [empleadosFsa, setEmpleadosFsa] = useState([]);
    const [detallesFsa, setDetallesFsa] = useState([]);
    const [sistemas, setSistemas]=useState([]);
    const toast = useRef(null);

    useEffect(() => {
        axios.post(conexion, { opcion: 29,}).then((response) => setEmpleadosFsa(response.data));
    }, [empleadosFsa]);
    
    const [hideDialog,editEntidad,confirmDeleteEEntidad,findIndexById,onInputChange,actionBodyTemplate,entidad,setEntidad,
      setEntidadDialog,setSubmitted,entidadDialog,submitted]=DialogComponent();
    /*
    const [hideDialogCargo,editEntidadCargo,confirmDeleteEEntidadCargo,findIndexByIdCargo,onInputChangeCargo,actionBodyTemplateCargo,entidadCargo,setEntidadCargo,
        setEntidadDialogCargo,setSubmittedCargo,entidadDialogCargo,submittedCargo]=DialogComponent();
    */
      /*<Button
                label="Cargo"
                icon="pi pi-pencil"
                className=" p-button-success mr-2"
                onClick={() => editEntidadCargo(rowData)}
                /> 
                <Dialog
                visible={entidadDialogCargo}
                style={{ width: "550px" }}
                header="Detalle Cargo"
                modal
                className="p-fluid"
                //footer={empleadoDialogFooter}
                onHide={hideDialogCargo}
            >
                {dialogItensCargo()}
            </Dialog> 
                */
    const Template = (rowData) => {
       // console.log(rowData)
        return (
            <React.Fragment>
                <Button
                icon="pi pi-pencil"
                className=" p-button-success mr-2"
                onClick={() => editEntidad(rowData)}
                />
                <PDFDownloadLink 
                    document={CargoFsa({})} 
                    fileName={("Cargo - "+rowData.nombre_completo).toUpperCase()}>
                    {   <Button
                        icon="pi pi-file-pdf"
                        label="cargo"
                        className="p-button-success mr-2" 
                    />}
                </PDFDownloadLink>
            </React.Fragment>
        );
    };
    const estadoBody=(rowData)=>{
        if(rowData['estado']==='N'){
            return(
            <React.Fragment>
            <span className="text-red-500"> NO AUTORIZADO</span>
            </React.Fragment>
            )
        }else{
            return(
            <React.Fragment>
                <span className="text-green-500">AUTORIZADO</span>
            </React.Fragment>
            )
        }
    };

    const columnasTabla=()=>{
        return[
            <Column key="user_fsa" field="id_fsa" sortable header="ID fSA" style={{ width: "2rem" }}></Column>,
            <Column key="user_fsa" field="dni_empl" sortable header="DNI"></Column>,
            <Column key="user_fsa" field="nombre_completo" sortable header="EMPLEADO"></Column>,
            <Column key="user_fsa" field="desc_ofic" sortable header="OFICINA"></Column>, 
            <Column key="user_fsa" field="id_deta" sortable header="ID DETALLE" style={{ width: "2rem" }}></Column>,  
            <Column key="user_fsa" field="fecha" sortable header="FECHA"></Column>,  
            <Column key="user_fsa" field="estado" sortable header="ESTADO"
              body={estadoBody}  
            >
            </Column>,  
            <Column key="user_fsa" header="ACCION"
                body={Template}
                exportable={false}
                style={{ minWidth: "8rem" }}
            ></Column>   
        ]
    }
    const viewSitemas=(_id_deta)=>{
        if(entidadDialog){
            var aux="";
            axios
            .post(conexion, {
                opcion: 30,
                id_deta:_id_deta,
        })
        .then((response) => { 

              
            const sis=response.data
            for(let i in sis){
                aux+= `<li>${sis[i]['nomb_sist']}</li>`
            }
            document.getElementById("sistemas").innerHTML=aux;
            }); 
        }
    };
    function readFile(event) {
        console.log(event.target.result);
      }
    const customBase64Uploader = async (event) => {
        var archivo = event.files[0];
        let archivoNombre=archivo.name;
        let xhr=new XMLHttpRequest();
        xhr.open("POST","http://172.20.106.185:8088/desa/bd/prueba.php");
        var datos = new FormData();
        datos.append("file", archivo);
        xhr.send(datos);
        /*
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
        
    }
    const dialogItens=()=>{     
        return[
            <div className="field" key="sustento_fsa">
            <label htmlFor="usuario">Sustento</label>
            <InputText
                id="usuario"
                value={entidad.sustento || ""}
                disabled
            />
        </div>,
        <div className="field" key="autorizado_fsa">
            <label htmlFor="usuario">Autorizado por</label>
            <InputText
                id="usuario"
                value={entidad.autorizado_por || ""}
                disabled
            />
        </div>,
        <div className="field" key="sistemas_fsa">
            <p>Sistemas</p>
            <ul id="sistemas" className="text-gray-400">
            {viewSitemas(entidad.id_deta)}
            </ul>
        </div>,
        <div  className="field" key="file_fsa">
            <p>Subir FSA Firmado</p>
            <FileUpload 
            name="demo" 
            accept="pdf/*" 
            maxFileSize={1000000}
            customUpload 
            uploadHandler={customBase64Uploader}
            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
        </div>,
        ];
    };
    const dialogItensCargo=()=>{     
        return[
            <div className="field" key="correo_fsa">
            <label htmlFor="usuario">Correo</label>
            <InputText
                id="usuario"
                placeholder="Ingresar correo"
                type="email"
            />
        </div>,
        ];
    };
    const chooseOptions = {label:"Agregar",className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {label:"Subir", className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {label:"Cancelar", className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};
    return (
        <div>
            <DataTableComponent 
                entidades={empleadosFsa} 
                columnasTabla={columnasTabla()}
                dataKey="id_empl"
            ></DataTableComponent>   
            <Dialog
                visible={entidadDialog}
                style={{ width: "550px" }}
                header="Detalle FSA"
                modal
                className="p-fluid"
                //footer={empleadoDialogFooter}
                onHide={hideDialog}
            >
                {dialogItens()}
            </Dialog> 
            
        </div>
  )
}
