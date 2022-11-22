import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from 'primereact/dropdown';
import Entidades from "../services/Entidades";

const DropdownComponent = ({entidad,setEntidad}) => {
    const [empleados,empleadosCombo,oficinas,oficinasCombo,perfiles,perfilCombo,estados,estadosCombo,areas,areasCombo]=Entidades();

    const onComboBoxChange = (e, name) => {
        //console.log(name);
        const val = (e.target && e.target.value) || "";
        let _entidad = { ...entidad };
        _entidad[`${name}`] = val;

        if(name==="nombre_completo")
        {
            let selectedEmpleado=empleadosCombo.filter(element => element.nombre_completo===val);
            _entidad[`id_empl`] =selectedEmpleado['0']['id_empl'];
            setEntidad(_entidad);
        }
        if(name==="desc_ofic")
        {
            let selectedOficina=oficinasCombo.filter(element => element.desc_ofic===val);
            _entidad[`id_ofic`] =selectedOficina['0']['id_ofic'];
            setEntidad(_entidad);
        }
        if(name==="desc_perf")
        {
            let selectedPerfil=perfilCombo.filter(element => element.id_perf===val);
            _entidad[`id_perf`] =selectedPerfil['0']['id_perf'];
            setEntidad(_entidad);
        }
        if(name==="desc_estd")
        {
            let selectedEstado=estadosCombo.filter(element => element.desc_estd===val);
            _entidad[`id_estd`] =selectedEstado['0']['id_estd'];
            setEntidad(_entidad);
        }
    };

    const dropdownEmpleados=()=>{
        return(
          <Dropdown id="empleado" value={entidad.nombre_completo || ""} options={empleados} onChange={(e) => onComboBoxChange(e, "nombre_completo")} placeholder={entidad.nombre_completo} filter/>
        );
    };
    const dropdownOficinas=()=>{
      return(
        <Dropdown id="oficina" value={entidad.desc_ofic || ""} options={oficinas} onChange={(e) => onComboBoxChange(e, "desc_ofic")} filter/>
      );
    };
    const dropdownPerfiles=()=>{
      return(
        <Dropdown id="perfil" value={entidad.desc_perf || ""} options={perfiles} onChange={(e) => onComboBoxChange(e, "desc_perf")} />
      );
    };
    const dropdownEstados=()=>{
      return(
        <Dropdown id="estado" value={entidad.desc_estd || ""} options={estados} onChange={(e) => onComboBoxChange(e, "desc_estd")} />
      )
    }

  return (
    [dropdownEmpleados,dropdownOficinas,dropdownPerfiles,dropdownEstados]
  )
}

export default DropdownComponent