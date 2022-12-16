import React from 'react'

export const FsaMantenimiento = () => {
    const conexion="http://localhost:8088/desa/bd/crud_uti.php";
    const [empleadosFsa, setEmpleadosFsa] = useState([]);
    
    useEffect(() => {
        axios.post(conexion, { opcion: 29,}).then((response) => setEmpleadosFsa(response.data));

    }, [usuariosVpn]);
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
    const columnasTabla=()=>{
        return[
            <Column key="user_fsa" field="dni" sortable header="ID"></Column>,
            <Column key="user_fsa" field="id_empl" sortable header="USUARIO VPN"></Column>,
            <Column key="user_fsa" field="nombre_completo" sortable header="ID EMPLEADO"></Column>,
            <Column key="user_fsa" field="id_fsa" sortable header="EMPLEADO"></Column>,  
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
