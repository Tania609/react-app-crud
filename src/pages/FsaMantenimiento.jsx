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
    const [datosCargo,setDatosCargo]=useState([]);
    const toast = useRef(null);

    useEffect(() => {
        axios.post(conexion, { opcion: 29,}).then((response) => setEmpleadosFsa(response.data));
    }, [empleadosFsa]);
    
    const [hideDialog,editEntidad,confirmDeleteEEntidad,findIndexById,onInputChange,actionBodyTemplate,entidad,setEntidad,
      setEntidadDialog,setSubmitted,entidadDialog,submitted]=DialogComponent();
    
    const [hideDialogCargo,editEntidadCargo,confirmDeleteEEntidadCargo,findIndexByIdCargo,onInputChangeCargo,actionBodyTemplateCargo,entidadCargo,setEntidadCargo,
        setEntidadDialogCargo,setSubmittedCargo,entidadDialogCargo,submittedCargo]=DialogComponent();
    
      /*<Button
                label="Cargo"
                icon="pi pi-pencil"
                className=" p-button-success mr-2"
                onClick={() => editEntidadCargo(rowData)}
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
                <Button
                    label="Cargo"
                    icon="pi pi-pencil"
                    className=" p-button-success mr-2"
                    onClick={() => editEntidadCargo(rowData)}
                /> 
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
    };
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
    const inputsSistemas=(_id_deta)=>{
        if(entidadDialogCargo){
            var aux="";
            axios
            .post(conexion, {
                opcion: 30,
                id_deta:_id_deta,
        })
        .then((response) => {
            setSistemas(response.data)
            }); 
        }
        var indents = [];
        for (var i = 0; i < sistemas.length; i++) {
            indents.push(
                <div key={i} className="grid align-items-baseline">
                    <div className="col-12 md:col-4">{sistemas[i]['nomb_sist']}</div>
                    <div className="col-12 md:col-4 field">
                        <InputText
                            id={"usuario"+i}
                            placeholder="Ingresar usuario"
                            type="text"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <InputText
                            id={"contraseña"+i}
                            placeholder="Ingresar contraseña"
                            type="text"
                        />
                    </div>
                </div>
            );
        }
        return indents;
       
    };
    const customBase64Uploader = async (event) => {
        const nombre_archivo=entidad.id_empl+"-"+entidad.id_fsa+"-"+entidad.id_deta+'.pdf';
        var file = event.files[0];
        const myNewFile = new File([file], nombre_archivo, {type: file.type});
        console.log(myNewFile);
        const data=new FormData();
        data.append('archivo',myNewFile);
        console.log(data);
        axios.post("http://localhost:8088/desa/bd/imagen.php", data,
        {
        'Content-Type': 'multipart/form-data'
        }).then((response) =>{
            console.log(response.data);
            if(response.data==="correcto"){
                axios.post(conexion, 
                    { opcion: 31,id_deta:entidad.id_deta,pdf_auto_dir:nombre_archivo})
                  .then((response) => console.log(response.data));
            }
        });

        
    }
    const leerPdf=(dir)=>{
        if(dir!==null){
            return(<a href={"file://172.20.106.185/c$/FSA/"+dir} target="_blank">{dir}</a>)
        }
    };
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
            {leerPdf(entidad.pdf_auto_dir)}
            <p>Subir FSA Firmado</p>
            <FileUpload 
            name="archivo" 
            accept="pdf/*" 
            maxFileSize={1000000}
            customUpload 
            uploadHandler={customBase64Uploader}
            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
        </div>,
        ];
    };
    const generarCargo=()=>{
        var datos=[];
        for (var i = 0; i < sistemas.length; i++) {
            datos.push([sistemas[i]['nomb_sist'],document.getElementById('usuario'+i).value,document.getElementById('contraseña'+i).value])
        }
        setDatosCargo(datos);
    };
    const dialogItensCargo=()=>{     
        var nombre=entidadCargo.nombre_completo;
        var dni=entidadCargo.dni;
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var fecha=(day+"/"+month+"/"+year).toString();
        var datos=[["hi","hil","jkfl"]]
        return[
            <div className="field" key="correo_fsa">
            <label htmlFor="usuario">Correo</label>
            <InputText
                id="usuario"
                placeholder="Ingresar correo"
                type="email"
            />
        </div>,
        <div className="field" key="sistemas_fsa">
            <p>Sistemas</p>
            <div id="sistemas" className="text-gray-400">
                {inputsSistemas(entidadCargo.id_deta)}
            </div>
        </div>,
        <PDFDownloadLink key="docu_cargo_fsa"  document={CargoFsa({nombre,dni,fecha,datos})} fileName={("PSI - "+entidadCargo.nombre_completo).toUpperCase()}>
                <Button label="Generar Cargo"className="p-button-success" type="submit" icon="pi pi-file-export" onClick={generarCargo}/>
        </PDFDownloadLink>
        
        ];
    };
    
    const empleadoDialogFooter = (
        <React.Fragment>
            <Button
            label="Cancel"
            icon="pi pi-times"
            className="p-button-text"
            onClick={hideDialog}
            />
            <Button
            label="Save"
            icon="pi pi-check"
            className="p-button-text"
            onClick={generarCargo}
            />
        </React.Fragment>
    );
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
            <Dialog
                visible={entidadDialogCargo}
                style={{ width: "650px" }}
                header="Detalle Cargo"
                modal
                className="p-fluid"
                footer={empleadoDialogFooter}
                onHide={hideDialogCargo}
            >
                {dialogItensCargo()}
            </Dialog> 
            
        </div>
  )
}
