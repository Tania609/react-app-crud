import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Entidades = () => {
    const empleados=[];
    const oficinas=[];
    const perfiles=[];
    const estados=[];
    const areas=[];

    const [empleadosCombo, setEmpleadosCombo] = useState([]);
    const [oficinasCombo, setOficinasCombo] = useState([]);
    const [perfilCombo, setPerfilCombo] = useState([]);
    const [estadosCombo, setEstadosCombo] = useState([]);
    const [areasCombo, setAreasCombo] = useState([])

    useEffect(() => {
        axios
          .post("http://172.20.106.186:8088/desa/bd/crud_uti.php", {
            opcion: 4,
          })
          .then((response) => setEmpleadosCombo(response.data));
        axios
          .post("http://172.20.106.186:8088/desa/bd/crud_uti.php", {
            opcion: 8,
          })
          .then((response) => setOficinasCombo(response.data));
        axios
          .post("http://172.20.106.186:8088/desa/bd/crud_uti.php", {
            opcion: 7,
          })
          .then((response) => setPerfilCombo(response.data));
        axios
          .post("http://172.20.106.186:8088/desa/bd/crud_uti.php", {
            opcion: 10,
          })
          .then((response) => setEstadosCombo(response.data));
        axios
          .post("http://172.20.106.186:8088/desa/bd/crud_uti.php", {
            opcion: 9,
          })
          .then((response) => setAreasCombo(response.data));
    }, []);

    for (let clave in empleadosCombo){
        empleados.push(empleadosCombo[clave].nombre_completo);
    };
    for (let clave in oficinasCombo){
        oficinas.push(oficinasCombo[clave].desc_ofic);
    };
    for (let clave in perfilCombo){
        perfiles.push(perfilCombo[clave].desc_perf);
    };
    for (let clave in estadosCombo){
        estados.push(estadosCombo[clave].desc_estd);
    };
    for (let clave in areasCombo){
        areas.push(areasCombo[clave].desc_area);
    };

    return [
        empleados,empleadosCombo,oficinas,oficinasCombo,perfiles,perfilCombo,estados,estadosCombo,areas,areasCombo
    ]
}

export default Entidades