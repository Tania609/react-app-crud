import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Toast } from 'primereact/toast';
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";

import DialogComponent from '../context/DialogComponent';
import HeaderExport from './HeaderExport';
import DataTableComponent from "./DataTableComponent";
import DropdownComponent from "../context/DropdownComponent";
import FiltrosEntidad from "../context/FiltrosEntidad";


//RAFCE CREACION DE COMPONENTE
const TableVpn = () => {
    //HOOKS - ESTADOS
    const [usuariosVpn, setUsuariosVpn] = useState([]);
    let emptyEntidad = {
        id_vpn: null,
    };
    //API
    useEffect(() => {
        axios.post("http://172.20.106.186:8088/desa/bd/crud_uti.php", { opcion: 17,}).then((response) => setUsuariosVpn(response.data));

    }, [usuariosVpn]);
    
    //CONSTANTES
    const toast = useRef(null);
    const cols = [
        { field: "id_vpn", header: "ID" },
        { field: "user_vpn", header: "USUARIO VPN" },
        { field: "id_empl", header: "ID EMPLEADO" },
        { field: "nombre_completo", header: "EMPLEADO" },
        { field: "ip_term_vpn", header: "ID TERM VPN" },
        { field: "host_term_vpn", header: "HOST TERM VPN" },
        { field: "desc_estd", header: "ESTADO" },
        { field: "obsv_vpn", header: "OBSERVACION" },
    ];

    //FUNCIONES
    const [hideDialog,editEntidad,confirmDeleteEEntidad,findIndexById,onInputChange,actionBodyTemplate,entidad,setEntidad,
        setEntidadDialog,setSubmitted,entidadDialog,submitted]=DialogComponent();

    const [dropdownEmpleados,dropdownOficinas,dropdownPerfiles,dropdownEstados]=DropdownComponent({entidad,setEntidad});

    const [estadoFilterTemplate,oficinaFilterTemplate,areaFilterTemplate]=FiltrosEntidad();
    
    const estadoBodyTemplate = (rowData) => {
        return (
          <span
            className={`empleado-badge estado-${rowData.desc_estd.toLowerCase()}`}
          >
            {rowData.desc_estd}
          </span>
        );
    };

    const saveUsuarioVPN = () => {
        console.log(entidad.id_estd);
        if(entidad.id_vpn===undefined ){
            let _entidades = [...usuariosVpn];
            if (entidad.user_vpn&&entidad.id_empl&&entidad.id_estd) {
                axios
                .post("http://172.20.106.186:8088/desa/bd/crud_uti.php", {
                    opcion: 15,
                    user_vpn: entidad.user_vpn,
                    ip_term_vpn: entidad.ip_term_vpn,
                    host_term_vpn: entidad.host_term_vpn,
                    id_empl: entidad.id_empl,
                    id_estd: entidad.id_estd,
                    obsv_vpn: entidad.obsv_vpn,
                })
                .then((response) => {});
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Usuario Creado",
                    life: 3000,
                });
                setUsuariosVpn(_entidades);
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
            if (entidad.id_vpn.trim()) {
                let _entidades = [...usuariosVpn];
                let _entidad = { ...entidad };
                if (entidad.id_vpn) {
                    const index = findIndexById(entidad.id_vpn);
                     _entidades[index] = _entidad;
                    toast.current.show({
                        severity: "success",
                        summary: "Successful",
                        detail: "Usuario Actualizado",
                        life: 3000,
                    });
                    axios
                    .post("http://172.20.106.186:8088/desa/bd/crud_uti.php", {
                      opcion: 16,
                      id_vpn: entidad.id_vpn,
                      user_vpn: entidad.user_vpn,
                      ip_term_vpn: entidad.ip_term_vpn,
                      host_term_vpn: entidad.host_term_vpn,
                      id_empl: entidad.id_empl,
                      id_estd: entidad.id_estd,
                      obsv_vpn: entidad.obsv_vpn,
                    })
                    .then((response) => {});
                }
                setEntidad(_entidades);
                setEntidadDialog(false);
                setEntidad(emptyEntidad);
            }     
        }
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
            onClick={saveUsuarioVPN}
            />
        </React.Fragment>
    );
    const openNew = () => {
        setEntidad(emptyEntidad);
        setSubmitted(false);
        setEntidadDialog(true);
    }
    const columnasTabla=()=>{
        return[
            <Column key="user_vpn" field="id_vpn" sortable header="ID"></Column>,
            <Column key="user_vpn" field="user_vpn" sortable header="USUARIO VPN"></Column>,
            <Column key="user_vpn" field="id_empl" sortable header="ID EMPLEADO"></Column>,
            <Column key="user_vpn" field="nombre_completo" sortable header="EMPLEADO"></Column>,
            <Column 
                key="desc_estd"
                field="desc_estd" 
                sortable 
                header="ESTADO"
                body={estadoBodyTemplate}
                filter
                filterElement={estadoFilterTemplate}
                filterMenuStyle={{ width: "14rem" }}
                showFilterMatchModes={false}
                showFilterOperator={false}
                showAddButton={false} //Para quitar el boton de mas reglas
            ></Column>,
            <Column key="user_vpn" field="ip_term_vpn" sortable header="IP TERM VPN"></Column>,
            <Column key="user_vpn" field="host_term_vpn" sortable header="HOST TERM VPN"></Column>,
            <Column key="user_vpn" field="obsv_vpn" sortable header="OBSERVACION"></Column>,
            <Column key="user_vpn" header="ACCION"
                body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "8rem" }}
            ></Column>   
        ]
    }
    const dialogItens=()=>{
        return[
            <div className="field" key="user_vpn">
                <label htmlFor="usuario">Usuario VPN</label>
                <InputText
                    id="usuario"
                    value={entidad.user_vpn || ""}
                    onChange={(e) => onInputChange(e, "user_vpn")}
                    required
                    autoFocus
                    className={classNames({"p-invalid": submitted && !entidad.nombre_completo,})}
                />
                {submitted && !entidad.user_vpn && (
                    <small className="p-error">Usuario VPN is required.</small>
                )}
            </div>,
            <div className="field" key="nombre_completo">
                <label htmlFor="empleado">Empleado</label>
                {dropdownEmpleados()}
                {submitted && !entidad.nombre_completo && (
                    <small className="p-error">Empleado is required.</small>
                )}
            </div>,
            <div className="field" key="desc_estd">
                <label htmlFor="estado">Estado</label>
                {dropdownEstados()}
                {submitted && !entidad.desc_estd && (
                    <small className="p-error">Estado is required.</small>
                )}
            </div>,
            <div className="field" key="ip_term_vpn">
                <label htmlFor="term">IP Term VPN</label>
                <InputText
                    id="term"
                    value={entidad.ip_term_vpn || ""}
                    onChange={(e) => onInputChange(e, "ip_term_vpn")}
                    autoFocus
                    className={classNames({"p-invalid": submitted && !entidad.ip_term_vpn,})}
                />
            </div>,
            <div className="field" key="host_term_vpn">
                <label htmlFor="term">HOST Term VPN</label>
                <InputText
                    id="term"
                    value={entidad.host_term_vpn || ""}
                    onChange={(e) => onInputChange(e, "host_term_vpn")}
                    autoFocus
                    className={classNames({"p-invalid": submitted && !entidad.host_term_vpn,})}
                />
            </div>,
            <div className="field" key="obsv_vpn">
                <label htmlFor="observacion">Observacion</label>
                <InputText
                    id="observacion"
                    value={entidad.obsv_vpn || ""}
                    onChange={(e) => onInputChange(e, "obsv_vpn")}
                    required
                    autoFocus
                    className={classNames({"p-invalid": submitted && !entidad.obsv_vpn,})}
                />
                {submitted && !entidad.obsv_vpn && (
                    <small className="p-error">Observacion is required.</small>
                )}
            </div>
        ];
    };
    return (
        <div>
            <Toast ref={toast} />
            <div className='header-botons'>
                <HeaderExport cols={cols} entidad={usuariosVpn} text="Usuarios VPN" ></HeaderExport>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-info" onClick={openNew} />
            </div>
            <DataTableComponent 
                entidades={usuariosVpn} 
                columnasTabla={columnasTabla()}
                dataKey="id_vpn"
            ></DataTableComponent>        
            <Dialog
                visible={entidadDialog}
                style={{ width: "450px" }}
                header="Detalle VPN"
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

export default TableVpn