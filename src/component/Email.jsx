import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';

import HeaderExport from './HeaderExport';
import DataTableComponent from "./DataTableComponent";
import DialogComponent from "../context/DialogComponent";
import DropdownComponent from "../context/DropdownComponent";
import FiltrosEntidad from "../context/FiltrosEntidad";

const Email = () => {
    const toast = useRef(null);
    const [emails, setEmails] = useState([]);
    let emptyEntidad = {
        id_mail: null,
    };
    useEffect(() => {
        axios.post("http://172.20.106.186:8088/desa/bd/crud_uti.php", { opcion: 11,}).then((response) => setEmails(response.data));

    }, [emails]);

    const colsExport = [
        { field: "id_mail", header: "ID" },
        { field: "desc_mail", header: "EMAIL" },
        { field: "nombre_completo", header: "NOMBRE" },
        { field: "desc_ofic", header: "OFICINA" },
        { field: "desc_perf", header: "PERFIL" },
        { field: "tipo_mail", header: "TIPO EMAIL" }
    ];
    const [hideDialog,editEntidad,confirmDeleteEEntidad,findIndexById,onInputChange,
            actionBodyTemplate,entidad,setEntidad,setEntidadDialog,setSubmitted,entidadDialog,submitted]=DialogComponent();
    
    const [dropdownEmpleados,dropdownOficinas,dropdownPerfiles]=DropdownComponent({entidad,setEntidad});

    const [estadoFilterTemplate,oficinaFilterTemplate,areaFilterTemplate]=FiltrosEntidad();
    
    const saveUsuarioEmail = () => {
        if(entidad.id_mail===undefined ){
            let _entidades = [...emails];
            if (entidad.desc_mail&&entidad.id_empl&&entidad.tipo_mail) {
                axios
                .post("http://172.20.106.186:8088/desa/bd/crud_uti.php", {
                    opcion: 13,
                    desc_mail: entidad.desc_mail,
                    tipo_mail: entidad.tipo_mail,
                    id_empl: entidad.id_empl,
                })
                .then((response) => {});
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Usuario Creado",
                    life: 3000,
                });
                setEmails(_entidades);
                setEntidadDialog(false);
                setEntidad(emptyEntidad);
            }else{
                if(!entidad.user_vpn){
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Ingresar Usuario VPN",
                        life: 3000,
                    });
                }
                else if(!entidad.id_empl){
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Ingresar empleado",
                        life: 3000,
                    });
                }
                else if(!entidad.id_empl){
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Ingresar estado",
                        life: 3000,
                    });
                }
            }
        }else{
            if (entidad.id_mail.trim()) {
                let _entidades = [...emails];
                let _entidad = { ...entidad };
                if (entidad.id_mail) {
                    const index = findIndexById(entidad.id_mail);
                     _entidades[index] = _entidad;
                    toast.current.show({
                        severity: "success",
                        summary: "Successful",
                        detail: "Usuario Actualizado",
                        life: 3000,
                    });
                    axios
                    .post("http://172.20.106.186:8088/desa/bd/crud_uti.php", {
                      opcion: 12,
                      id_mail: entidad.id_mail,
                      desc_mail: entidad.desc_mail,
                      tipo_mail: entidad.tipo_mail,
                      id_empl: entidad.id_empl,
                    })
                    .then((response) => {});
                }
                setEntidad(_entidades);
                setEntidadDialog(false);
                setEntidad(emptyEntidad);
            }     
        }
    };
    const columnasTabla=()=>{
        return[
            <Column key="email_table" field="id_mail" sortable header="ID"></Column>,
            <Column key="email_table" field="desc_mail" sortable header="EMAIL"></Column>,
            <Column key="email_table" field="nombre_completo" sortable header="NOMBRE"></Column>,
            <Column 
                key="email_table" 
                field="desc_ofic"
                header="Oficina"
                filter
                filterField="desc_ofic"
                filterElement={oficinaFilterTemplate}
                filterMenuStyle={{ width: "14rem" }}
                showFilterMatchModes={false}
                showFilterOperator={false}
                showFilterMenuOptions={false}
                style={{ minWidth: "8rem" }}
                sortable
            ></Column>,
            <Column key="email_table" field="desc_perf" sortable header="PERFIL"></Column>,
            <Column key="email_table" field="tipo_mail" sortable header="TIPO EMAIL"></Column>,
            <Column key="email_table" header="ACCION"
                body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "8rem" }}
            ></Column>   
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
            onClick={saveUsuarioEmail}
            />
        </React.Fragment>
    );

    const dialogItens=()=>{
        return[
            <div className="field" key="desc_mail">
                <label htmlFor="email">EMAIL</label>
                <InputText
                    id="email"
                    type="email"
                    value={entidad.desc_mail || ""}
                    onChange={(e) => onInputChange(e, "desc_mail")}
                    required
                    autoFocus
                    className={classNames({"p-invalid": submitted && !entidad.desc_mail,})}
                />
                {submitted && !entidad.desc_mail && (
                    <small className="p-error">Email is required.</small>
                )}
            </div>,
            <div className="field" key="nombre_completo">
                <label htmlFor="nombre">Nombre</label>
                {dropdownEmpleados()}
                {submitted && !entidad.nombre_completo && (
                    <small className="p-error">Nombre is required.</small>
                )}
            </div>,      
            <div className="field" key="tipo_mail">
                <label htmlFor="tipo_email">EMAIL</label>
                <InputText
                    id="tipo_email"
                    value={entidad.tipo_mail || ""}
                    onChange={(e) => onInputChange(e, "tipo_mail")}
                    required
                    autoFocus
                    className={classNames({"p-invalid": submitted && !entidad.tipo_mail,})}
                />
                {submitted && !entidad.tipo_mail && (
                    <small className="p-error">Email tipo is required.</small>
                )}
            </div>,
        ];
    };
    const openNew = () => {
        setEntidad(emptyEntidad);
        setSubmitted(false);
        setEntidadDialog(true);
    }
    return (
        <div>
            <Toast ref={toast} />
            <div className='header-botons'>
                <HeaderExport cols={colsExport} entidad={emails} text="Emails" ></HeaderExport>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-info" onClick={openNew}/>
            </div>
            <DataTableComponent 
                entidades={emails} 
                columnasTabla={columnasTabla()}
                dataKey="id_mail"
            >
            </DataTableComponent> 

            <Dialog
                    visible={entidadDialog}
                    style={{ width: "450px" }}
                    header="Detalle EMAIL"
                    modal
                    className="p-fluid"
                    footer={empleadoDialogFooter}
                    onHide={hideDialog}
            >
                    {dialogItens()}
            </Dialog>
        </div>
    )
}

export default Email