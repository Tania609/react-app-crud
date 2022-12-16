import { Column } from "primereact/column";
import React, { useState, useEffect, useRef } from "react";
import DataTableComponent from "../component/DataTableComponent";
import axios from "axios";
import { Button } from "primereact/button";
export const FsaMantenimiento = () => {
    const conexion="http://localhost:8088/desa/bd/crud_uti.php";
    const [empleadosFsa, setEmpleadosFsa] = useState([]);
    const [detallesFsa, setDetallesFsa] = useState([]);
    useEffect(() => {
        axios.post(conexion, { opcion: 29,}).then((response) => setEmpleadosFsa(response.data));
        axios.post(conexion, { opcion: 27,}).then((response) => setDetallesFsa(response.data));
    }, [empleadosFsa]);
   
    const actionBodyTemplate = (rowData) => {
        
        return (
          <React.Fragment>
            
            <Button
            
              icon="pi pi-pencil"
              className="p-button-rounded p-button-success mr-2"
              //onClick={() => editEntidad(rowData)}
            />
          </React.Fragment>
        );
    };
    const columnasTabla=()=>{
        return[
            <Column key="user_fsa" field="id_fsa" sortable header="ID_FSA"></Column>,
            <Column key="user_fsa" field="dni_empl" sortable header="DNI"></Column>,
            <Column key="user_fsa" field="nombre_completo" sortable header="EMPLEADO"></Column>,
            <Column key="user_fsa" field="desc_ofic" sortable header="OFICINA"></Column>,  
            <Column key="user_fsa" header="HISTORIAL"
                body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "8rem" }}
            ></Column>   
        ]
    }
  return (
    <div>
        <DataTableComponent 
                entidades={empleadosFsa} 
                columnasTabla={columnasTabla()}
                dataKey="id_empl"
        ></DataTableComponent>    
    </div>
  )
}
