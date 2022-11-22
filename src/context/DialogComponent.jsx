import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";

const DialogComponent = () => {
  
    const [entidadDialog, setEntidadDialog] = useState(false);
    const [deletEntidadDialog, setDeleteEntidadDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);   
    const [entidad,setEntidad]= useState([]);  

    const actionBodyTemplate = (rowData) => {
        return (
          <React.Fragment>
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-success mr-2"
              onClick={() => editEntidad(rowData)}
            />
          </React.Fragment>
        );
    };
    const hideDialog = () => {
        setSubmitted(false);
        setEntidadDialog(false);
      };
    const editEntidad = (entidad) => {
        setEntidad({ ...entidad });
        setEntidadDialog(true);
    };
    const confirmDeleteEEntidad = (entidad) => {
        setEntidad(entidad);
        setDeleteEntidadDialog(true);
    };

    const findIndexById = (id_empl) => {
        console.log(entidad.length);
        let index = -1;
        for (let i = 0; i < entidad.length; i++) {
          if (entidad[i].id_empl === id_empl) {
            index = i;
            break;
          }
        }
    
        return index;
    };
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _entidad = { ...entidad };
        _entidad[`${name}`] = val;
        setEntidad(_entidad);
    };
    
  return (
    [hideDialog,editEntidad,confirmDeleteEEntidad,findIndexById,onInputChange,actionBodyTemplate,entidad,setEntidad,setEntidadDialog,setSubmitted,entidadDialog,submitted]
  )
}

export default DialogComponent