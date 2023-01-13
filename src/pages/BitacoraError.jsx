import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Toast } from 'primereact/toast';
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";

import DialogComponent from '../context/DialogComponent';
import HeaderExport from '../component/HeaderExport';
import DataTableComponent from "../component/DataTableComponent";
import DropdownComponent from "../context/DropdownComponent";
import FiltrosEntidad from "../context/FiltrosEntidad";

const BitacoraError = () => {
    const [errores, setErrores] = useState([]);
    let emptyEntidad = {
        errores: null,
    };
    const conexion="http://172.20.106.185:8088/desa/bd/crud_uti.php";
    //API
    useEffect(() => {
        axios.post(conexion, { opcion: 33,}).then((response) => setErrores(response.data));
    }, [errores]);
    
    //CONSTANTES
    const toast = useRef(null);
    const cols = [
        { field: "id_error", header: "ID" },
        { field: "sistema", header: "SISTEMA" },
        { field: "version_sist", header: "VERSION" },
        { field: "fecha_version", header: "FECHA VERSION" },
        { field: "detalle_error", header: "DETALLE ERROR" },
        { field: "fecha", header: "FECHA" },
        { field: "nombre_completo", header: "ESPECIALISTA UTI" },
        { field: "desc_ofic", header: "OFICINA" },
        { field: "reportado_ogti", header: "REPORTADO POR" },
        { field: "estado", header: "ESTADO" },
    ];

    //FUNCIONES
    const [hideDialog,editEntidad,confirmDeleteEEntidad,findIndexById,onInputChange,actionBodyTemplate,entidad,setEntidad,
        setEntidadDialog,setSubmitted,entidadDialog,submitted]=DialogComponent();

    const [dropdownEmpleados,dropdownOficinas,dropdownPerfiles,dropdownEstados]=DropdownComponent({entidad,setEntidad});
    
    const [estadoFilterTemplate,oficinaFilterTemplate,areaFilterTemplate]=FiltrosEntidad();
    
    const openNew = () => {
        setEntidad(emptyEntidad);
        setSubmitted(false);
        setEntidadDialog(true);
    }

   
    
  
    const columnasTabla=()=>{
        return[
            <Column key="bita_error" field="id_error" sortable header="ID"></Column>,
            <Column key="bita_error" field="sistema" sortable header="SISTEMA"></Column>,
            <Column key="bita_error" field="version_sist" sortable header="VERSION"></Column>,
            <Column key="bita_error" field="fecha_version" sortable header="FECHA VERSION"></Column>,
            <Column key="bita_error" field="detalle_error" sortable header="DETALLE ERROR"></Column>,
            <Column key="bita_error" field="fecha" sortable header="FECHA"></Column>,
            <Column key="bita_error" field="nombre_completo" sortable header="ESPECIALISTA UTI"></Column>,
            <Column key="bita_error" field="desc_ofic" sortable header="OFICINA"></Column>,
            <Column key="bita_error" field="reportado_ogti" sortable header="REPORTADO POR"></Column>,
            <Column key="bita_error" field="estado" sortable header="ESTADO"></Column>,
            <Column key="bita_error" header="ACCION"
                //body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "8rem" }}
            ></Column>   
        ]
    }
    const dialogItens=()=>{
        return[
           
            <div className="grid" key="atributos">
                <div className="field col-12 md:col-6" key="sistema_error">
                    <label htmlFor="sistema">Sistema</label>
                    <InputText
                        id="sistema"
                        value={entidad.sistema || ""}
                        onChange={(e) => onInputChange(e, "sistema")}
                        required
                        autoFocus
                        className={classNames({"p-invalid": submitted && !entidad.sistema,})}
                    />
                    {submitted && !entidad.sistema && (
                        <small className="p-error">Sistema is required.</small>
                    )}
                </div>
                <div className="field col-12 md:col-6" key="version_error">
                    <label htmlFor="version">Version Sistema</label>
                    <InputText
                        id="version"
                        value={entidad.sistema || ""}
                        onChange={(e) => onInputChange(e, "sistema")}
                        required
                        autoFocus
                        className={classNames({"p-invalid": submitted && !entidad.sistema,})}
                    />
                    {submitted && !entidad.sistema && (
                        <small className="p-error">Sistema is required.</small>
                    )}
                </div>
                <div className="field col-12 md:col-6" key="fechaVer_error">
                    <label htmlFor="fechaVer">Fecha Version</label>
                    <InputText
                        id="fechaVer"
                        value={entidad.sistema || ""}
                        onChange={(e) => onInputChange(e, "sistema")}
                        required
                        autoFocus
                        className={classNames({"p-invalid": submitted && !entidad.sistema,})}
                    />
                    {submitted && !entidad.sistema && (
                        <small className="p-error">Sistema is required.</small>
                    )}
                </div>
                <div className="field col-12 md:col-6" key="detalle_error">
                    <label htmlFor="detalle">Detalle Error</label>
                    <InputText
                        id="detalle"
                        value={entidad.sistema || ""}
                        onChange={(e) => onInputChange(e, "sistema")}
                        required
                        autoFocus
                        className={classNames({"p-invalid": submitted && !entidad.sistema,})}
                    />
                    {submitted && !entidad.sistema && (
                        <small className="p-error">Sistema is required.</small>
                    )}
                </div>
                <div className="field col-12 md:col-6" key="fecha_error">
                    <label htmlFor="fecha">Fecha</label>
                    <InputText
                        id="fecha"
                        value={entidad.sistema || ""}
                        onChange={(e) => onInputChange(e, "sistema")}
                        required
                        autoFocus
                        className={classNames({"p-invalid": submitted && !entidad.sistema,})}
                    />
                    {submitted && !entidad.sistema && (
                        <small className="p-error">Sistema is required.</small>
                    )}
                </div>
                <div className="field col-12 md:col-6" key="oficina_error">
                    <label htmlFor="oficina">Oficina</label>
                    <InputText
                        id="oficina"
                        value={entidad.sistema || ""}
                        onChange={(e) => onInputChange(e, "sistema")}
                        required
                        autoFocus
                        className={classNames({"p-invalid": submitted && !entidad.sistema,})}
                    />
                    {submitted && !entidad.sistema && (
                        <small className="p-error">Sistema is required.</small>
                    )}
                </div>
                <div className="field col-12 md:col-6" key="especialista_error">
                    <label htmlFor="especialista">Especialista UTI</label>
                    <InputText
                        id="especialista"
                        value={entidad.sistema || ""}
                        onChange={(e) => onInputChange(e, "sistema")}
                        required
                        autoFocus
                        className={classNames({"p-invalid": submitted && !entidad.sistema,})}
                    />
                    {submitted && !entidad.sistema && (
                        <small className="p-error">Sistema is required.</small>
                    )}
                </div>
                <div className="field col-12 md:col-6" key="reportado_error">
                    <label htmlFor="reportado">Reportado A</label>
                    <InputText
                        id="reportado"
                        value={entidad.sistema || ""}
                        onChange={(e) => onInputChange(e, "sistema")}
                        required
                        autoFocus
                        className={classNames({"p-invalid": submitted && !entidad.sistema,})}
                    />
                    {submitted && !entidad.sistema && (
                        <small className="p-error">Sistema is required.</small>
                    )}
                </div>
                <div className="field col-12 md:col-6" key="nroDoc_error">
                    <label htmlFor="nroDoc">N° de docuemnto</label>
                    <InputText
                        id="nroDoc"
                        value={entidad.sistema || ""}
                        onChange={(e) => onInputChange(e, "sistema")}
                        required
                        autoFocus
                        className={classNames({"p-invalid": submitted && !entidad.sistema,})}
                    />
                    {submitted && !entidad.sistema && (
                        <small className="p-error">Sistema is required.</small>
                    )}
                </div>
                <div className="field col-12 md:col-6" key="estado_error">
                    <label htmlFor="estado">Estado</label>
                    <InputText
                        id="estado"
                        value={entidad.sistema || ""}
                        onChange={(e) => onInputChange(e, "sistema")}
                        required
                        autoFocus
                        className={classNames({"p-invalid": submitted && !entidad.sistema,})}
                    />
                    {submitted && !entidad.sistema && (
                        <small className="p-error">Sistema is required.</small>
                    )}
                </div>
            </div>,
            
            
        ];
    };
 
    return (
        <div>
            <Toast ref={toast} />
            <div className='header-botons'>
                <HeaderExport cols={cols} entidad={errores} text="Bitacora error" ></HeaderExport>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-info" onClick={openNew}/>
            </div>
            <DataTableComponent 
                entidades={errores} 
                columnasTabla={columnasTabla()}
                dataKey="id_error"
            ></DataTableComponent>        
       
            <Dialog
                visible={entidadDialog}
                style={{ width: "850px" }}
                header="Datos de Error"
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

export default BitacoraError