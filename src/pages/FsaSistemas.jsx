import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const FsaSistemas = ({id_deta}) => {
    const [sistemas, setSistemas] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:8088/desa/bd/crud_mysql.php", { opcion: 9,id_deta:id_deta}).then((response) => setSistemas(response.data));

    }, []);

    const view=()=>{
        console.log(sistemas)
        return (
            sistemas.map(item => (
                
                     
                        <h4>{item}</h4>
                      
              )
            ));
      }
  return (
    <div>{view}</div>
  )
}

export default FsaSistemas