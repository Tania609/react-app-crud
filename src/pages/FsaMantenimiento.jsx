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
import { PDFDownloadLink,PDFViewer} from '@react-pdf/renderer';
import CargoFsa from "../reports/CargoFsa";
import { useParams } from 'react-router';
import { Divider } from 'primereact/divider';
const FsaMantenimiento = () => {
    const { id_empleado } = useParams();
    const ruta_fsa='http://172.20.106.185:3000/fsa';
    const conexion="http://172.20.106.185:8088/desa/bd/crud_uti.php";
    const [empleadosFsa, setEmpleadosFsa] = useState([]);
    const [sistemas, setSistemas]=useState([]);
    const [datosCargo,setDatosCargo]=useState([]);
    const toast = useRef(null);
    const fsaGuardado = () => {
        toast.current.show({severity:'success', summary: 'FSA Actualizado', life: 3000});
    };
    const msjEliminarFSA= () => {
        toast.current.show({severity:'success', summary: 'Archivo Eliminado', life: 3000});
    };
    useEffect(() => {
        axios.post(conexion, { opcion: 38,id_empl:id_empleado}).then((response) => setEmpleadosFsa(response.data));
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
                    label="FSA"
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
    const estadoBodyCargo=(rowData)=>{
        if(rowData['cargo_subido']==='N'){
            return(
            <React.Fragment>
            <span className="text-red-500">NO</span>
            </React.Fragment>
            )
        }else{
            return(
            <React.Fragment>
                <span className="text-green-500">SI</span>
            </React.Fragment>
            )
        }
    };
    const columnasTabla=()=>{
        return[
            <Column key="user_fsa" field="id_deta" sortable header="ID DETALLE" style={{ width: "2rem" }}></Column>,  
            <Column key="user_fsa" field="nombre_completo" sortable header="EMPLEADO"></Column>, 
            <Column key="user_fsa" field="fecha" sortable header="FECHA"></Column>,  
            <Column key="user_fsa" field="estado" sortable header="FSA ESTADO"
              body={estadoBody}  
            >
            </Column>,  
            <Column key="user_fsa" field="estado_cargo" sortable header="CARGO SUBIDO"
                body={estadoBodyCargo}  
            >
            </Column>,  
            <Column key="user_fsa" header="ACCION"
                body={Template}
                exportable={false}
                style={{ minWidth: "8rem" }}
            ></Column> ,
            <Column key="user_fsa" header="CARGO"
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
                var sis=response.data
                for(let i in sis){
                    aux+= `<li>${sis[i]['nomb_sist']}</li>`
                }
                document.getElementById("sistemas").innerHTML=aux;
                }); 
        }
    };
    const inputsSistemas=(_id_deta)=>{
        if(entidadDialogCargo){
           axios
            .post(conexion, {
                opcion: 30,
                id_deta:_id_deta,
        })
        .then((response) => {
            setSistemas(response.data)
            } ); 
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
                            onChange={generarCargo}
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <InputText
                            id={"contraseña"+i}
                            placeholder="Ingresar contraseña"
                            type="text"
                            onChange={generarCargo}
                        />
                    </div>
                </div>
            );
        }
        return indents;
       
    };
    const customBase64Uploader = async (event) => {
        const nombre_archivo="FSA-"+entidad.nombre_completo+"-"+entidad.id_empl+"-"+entidad.id_fsa+"-"+entidad.id_deta+'.pdf';
        var file = event.files[0];
        const myNewFile = new File([file], nombre_archivo, {type: file.type});
        //console.log(myNewFile);
        const data=new FormData();
        data.append('archivo',myNewFile);
        //console.log(data);
        axios.post("http://172.20.106.185:8088/desa/bd/imagen.php", data,
        {
        'Content-Type': 'multipart/form-data'
        }).then((response) =>{
            //console.log(response.data);
            if(response.data==="correcto"){
                axios.post(conexion, 
                    { opcion: 31,id_deta:entidad.id_deta,pdf_auto_dir:nombre_archivo})
                fsaGuardado();
                setEntidadDialog(false);
            }
        });      
    };
    const subirCargo=async(event)=>{
        const nombre_archivo="CARGO-"+entidadCargo.nombre_completo+"-"+entidadCargo.id_empl+"-"+entidadCargo.id_fsa+"-"+entidadCargo.id_deta+'.pdf';
        var file = event.files[0];
        const myNewFile = new File([file], nombre_archivo, {type: file.type});
        //console.log(myNewFile);
        const data=new FormData();
        data.append('archivo',myNewFile);
        //console.log(data);
        axios.post("http://172.20.106.185:8088/desa/bd/imagen.php", data,
        {
        'Content-Type': 'multipart/form-data'
        }).then((response) =>{
            //console.log(response.data);
            if(response.data==="correcto"){
                axios.post(conexion, 
                    { opcion: 39,id_deta:entidadCargo.id_deta,pdf_cargo_dir:nombre_archivo})
                fsaGuardado();
                setEntidadDialogCargo(false);
            }
        });      
    }
    const leerPdf=(deta,dir)=>{
        const eliminar=()=>{
            axios.post(conexion, {
                opcion: 35,id_deta:deta,file_dir:dir
            })
            msjEliminarFSA();
            setEntidadDialog(false);
        }
        if(dir!==null){
            return(
                <div className="field py-1">
                    <p>FSA Firmado <span className="text-xs text-gray-400">({dir})</span></p>
                    <div className="grid">
                        <a className="col-6 text-green-500 border-1 border-round-md py-1 px- my-3" href={"http://172.20.106.185:8088/desa/bd/downloadFile.php?opcion="+dir}>Descargar</a>
                        <div className="col-6">
                            <Button className=" p-button-outlined p-button-danger py-1 px-3" onClick={eliminar}>Eliminar</Button>
                        </div>
                    </div>
                </div>
            )
        }else{
            return[
                <p key="tit">Subir FSA Firmado</p>,
                <FileUpload key="arch"
                name="archivo" 
                accept="pdf/*" 
                maxFileSize={1000000}
                customUpload 
                uploadHandler={customBase64Uploader}
                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
            ]
        }
    };
    const leerPdfCargo=(deta,dir)=>{
        const eliminar=()=>{
            axios.post(conexion, {
                opcion: 40,id_deta:deta,file_dir:dir
            })
            msjEliminarFSA();
            setEntidadDialogCargo(false);
        }
        if(dir!==null){
            return(
                <div className="field py-1">
                    <p className="font-bold">Cargo Firmado <span className="text-xs text-gray-400">({dir})</span></p>
                    <div className="grid">
                        <a className="col-6 text-green-500 border-1 border-round-md py-1 px- my-3" href={"http://172.20.106.185:8088/desa/bd/downloadFile.php?opcion="+dir}>Descargar</a>
                        <div className="col-6">
                            <Button className=" p-button-outlined p-button-danger py-1 px-3" onClick={eliminar}>Eliminar</Button>
                        </div>
                    </div>
                </div>
            )
        }else{
            return[
                <p key="tit2" className="font-bold">Subir Cargo</p>,
                <FileUpload key="arch2"
                name="archivo" 
                accept="pdf/*" 
                maxFileSize={1000000}
                customUpload 
                uploadHandler={subirCargo}
                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
            ]
        }
    };
    const dialogItens=()=>{  
        return[
        <div className="field" key="DIR_fsa">
            <label htmlFor="dir_ip">Dirección IP</label>
            <InputText
                id="dir_ip"
                value={entidad.dir_ip || ""}
                disabled
            />
        </div>,
         <div className="field" key="sustento_fsa">
            <label htmlFor="sustento">Sustento</label>
            <InputText
                id="sustento"
                value={entidad.sustento || ""}
                disabled
            />
        </div>,
        <div className="field" key="autorizado_fsa">
            <label htmlFor="auto_por">Autorizado por</label>
            <InputText
                id="auto_por"
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
            {leerPdf(entidad.id_deta,entidad.pdf_auto_dir)}
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
        var dni=entidadCargo.dni_empl;
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var fecha=(day+"/"+month+"/"+year).toString();
        return[
        <div className="field mb-0" key="sistemas_fsa">
            <p className="font-bold">Sistemas</p>
            <div id="sistemas" className="text-gray-400">
                {inputsSistemas(entidadCargo.id_deta)}
            </div>
        </div>,
        <PDFDownloadLink  key="docu_cargo_fsa"  document={CargoFsa({nombre,dni,fecha,datosCargo})} fileName={("CARGO - "+entidadCargo.nombre_completo).toUpperCase()}>
                <Button label="Generar Cargo"className="p-button-success" type="submit" icon="pi pi-file-export" onClick={generarCargo}/>
        </PDFDownloadLink>,
        <Divider key='cargo-div' />,
        <div  className="field" key="file_fsa">
            {leerPdfCargo(entidadCargo.id_deta,entidadCargo.pdf_cargo_dir)}
        </div>,
        ];
    };
    
    const chooseOptions = {label:"Agregar",className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {label:"Subir", className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {label:"Cancelar", className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};
    return (
        <div>
            <div className="grid">
                <a className="col-12 md:col-5 text-left" href={ruta_fsa}><i className="pi pi-angle-double-left mr-2"></i>Regresar</a>
                <span className="text-2xl col-12 md:col-7 text-left font-bold">FSA - DETALLES</span>
            </div>
            <Toast ref={toast} key="mensaje"/>
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
                onHide={hideDialogCargo}
            >
                {dialogItensCargo()}
            </Dialog> 
            
        </div>
  )
}

export default FsaMantenimiento