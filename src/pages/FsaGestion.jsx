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

const FsaGestion = () => {
    const conexion="http://172.20.106.185:8088/desa/bd/crud_uti.php";
    const ruta_fsa_deta='http://172.20.106.185:3000/fsa_detalle/';
    const ruta_fsa_crear='http://172.20.106.185:3000/fsa-crear';
    const [empleadosFsa, setEmpleadosFsa] = useState([]);
    const [empleadosDetaFsa, setEmpleadosDetaFsa] = useState([]);
    useEffect(() => {
        axios.post(conexion, { opcion: 36,}).then((response) => setEmpleadosFsa(response.data));
    }, [empleadosFsa]);

    const [hideDialog,editEntidad,confirmDeleteEEntidad,findIndexById,onInputChange,actionBodyTemplate,entidad,setEntidad,
        setEntidadDialog,setSubmitted,entidadDialog,submitted]=DialogComponent();
        
    const verDetalleFsa = (rowData) => {
         return (
             <React.Fragment>
                 <Button
                     label="VER FSAs"
                     icon="pi pi-angle-double-right"
                     className=" p-button-success mr-2"
                     onClick={(e) => {
                        e.preventDefault();
                        window.location.href=ruta_fsa_deta+rowData.id_empl;
                        }}
                 /> 
             </React.Fragment>
         );
     };

    const columnasTabla=()=>{
        return[
            <Column key="user_fsa" field="id_fsa" sortable header="ID fSA" style={{ width: "2rem" }}></Column>,
            <Column key="user_fsa" field="nombre_completo" sortable header="EMPLEADO"></Column>,
            <Column key="user_fsa" field="dni_empl" sortable header="DNI"></Column>,
            <Column key="user_fsa" field="desc_ofic" sortable header="OFICINA"></Column>, 
            <Column key="user_fsa" field="desc_area" sortable header="AREA" style={{ width: "2rem" }}></Column>, 
            <Column key="user_fsa" header="OPCIÓN"
                body={verDetalleFsa}
                exportable={false}
                style={{ minWidth: "8rem" }}
            ></Column>
        ]
    };

    const detalleFsaDialog=()=>{  
        /*
        axios
            .post(conexion, {
                opcion: 37,
                id_empl:entidad.id_empl
        })
        .then((response) => {
            setEmpleadosDetaFsa(response.data)
        } );
        */
        
        return[
         <div className="field" key="sustento_fsa">
            <p>HI</p>
            
        </div>
        ];
    };

    return (
        <div>
            <div className="grid">
                <div className="col-12 md:col-5 text-left pl-3">
                    <a className=" text-green-500 p-2 border-1 text-sm" href={ruta_fsa_crear}><i className="pi pi-plus-circle mr-2"></i>CREAR FSA</a>
                </div>
                <span className="text-2xl col-12 md:col-7 text-left font-bold">FSA - ADMINISTRACIÓN</span>
            </div>
            <DataTableComponent 
                entidades={empleadosFsa} 
                columnasTabla={columnasTabla()}
                dataKey="id_fsa"
            ></DataTableComponent> 

            <Dialog
                visible={entidadDialog}
                style={{ width: "950px" }}
                header="Detalle FSA"
                modal
                className="p-fluid"
                //footer={empleadoDialogFooter}
                onHide={hideDialog}
            >
                {detalleFsaDialog()}
            </Dialog>   
        </div>
    )
}

export default FsaGestion