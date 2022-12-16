import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
const BuscarFsa = ({id_empl}) => {
    const conexion="http://localhost:8088/desa/bd/crud_uti.php";
    const [id_fsa,setId_fsa]=useState("");
    //recupera id_fsa del empleado
    useCallback(() => {
        axios
            .post(conexion, {
                opcion: 23,
                id_empl:id_empl,
            })
            .then((response) => (console.log(response.data)));
    }, []);
    console.log(id_fsa)
  return ([
    id_fsa
  ])
}

export default BuscarFsa