import { Column } from "primereact/column";
import React, { useState, useEffect, useRef } from "react";
import DataTableComponent from "../component/DataTableComponent";
import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import DialogComponent from "../context/DialogComponent";
export const FsaMantenimiento = () => {
    const conexion="http://localhost:8088/desa/bd/crud_uti.php";
    const [empleadosFsa, setEmpleadosFsa] = useState([]);
    const [detallesFsa, setDetallesFsa] = useState([]);
    const [sistemas, setSistemas]=useState([]);
    const toast = useRef(null);

    useEffect(() => {
        axios.post(conexion, { opcion: 29,}).then((response) => setEmpleadosFsa(response.data));
    }, [empleadosFsa]);
    
    const [hideDialog,editEntidad,confirmDeleteEEntidad,findIndexById,onInputChange,actionBodyTemplate,entidad,setEntidad,
      setEntidadDialog,setSubmitted,entidadDialog,submitted]=DialogComponent();

    const estadoBody=(rowData)=>{
      if(rowData['estado']==='N'){
        return(
          <React.Fragment>
           <span className="text-red-500"> NO AUTORIZADO</span>
          </React.Fragment>
        )
      }else{
        return(
          <React.Fragment>
             <span className="text-green-500">AUTORIZADO</span>
          </React.Fragment>
        )
      }
    };

    const columnasTabla=()=>{
        return[
            <Column key="user_fsa" field="id_fsa" sortable header="ID_FSA"></Column>,
            <Column key="user_fsa" field="dni_empl" sortable header="DNI"></Column>,
            <Column key="user_fsa" field="nombre_completo" sortable header="EMPLEADO"></Column>,
            <Column key="user_fsa" field="desc_ofic" sortable header="OFICINA"></Column>, 
            <Column key="user_fsa" field="id_deta" sortable header="ID_DETALLE"></Column>,  
            <Column key="user_fsa" field="fecha" sortable header="FECHA"></Column>,  
            <Column key="user_fsa" field="estado" sortable header="ESTADO"
              body={estadoBody}  
            >
            </Column>,  
            <Column key="user_fsa" header="ACCION"
                body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "8rem" }}
            ></Column>   
        ]
    }
    const viewSsitemas=(_id_deta)=>{
      axios
      .post(conexion, {
          opcion: 30,
          id_deta:_id_deta,
      })
      .then((response) => {
        const sistemas_=response.data;
        return[
        
             <span className="text-green-500">AUTORIZADO</span>
          
        ];
      }); 
    } 
    const onUpload = () => {
      toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
      
    }
  const customBase64Uploader = async (event) => {
      // convert file to base64 encoded
      const file = event.files[0];
      const reader = new FileReader();
      let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
      reader.readAsDataURL(blob);
      console.log(blob);
      reader.onloadend = function () {
          const base64data = reader.result;
          console.log(base64data);
      }
  }
    const dialogItens=()=>{     
      return[
        <div className="field" key="sustento_fsa">
          <label htmlFor="usuario">Sustento</label>
          <InputText
              id="usuario"
              value={entidad.sustento || ""}
              disabled
          />
      </div>,
      <div className="field" key="autorizado_fsa">
        <label htmlFor="usuario">Autorizado por</label>
        <InputText
            id="usuario"
            value={entidad.autorizado_por || ""}
            disabled
        />
      </div>,
      <div className="field" key="sistemas_fsa">
       
      </div>,
      <div  className="field" key="file_fsa">
      
                <h5>Advanced</h5>
                <FileUpload name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" onUpload={onUpload} multiple accept="pdf/*" maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />

<h5>Custom (base64 encoded)</h5>
                <FileUpload mode="basic" name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" accept="image/*" customUpload uploadHandler={customBase64Uploader} />
      </div>,
      ];
  };
  return (
    <div>
        <DataTableComponent 
                entidades={empleadosFsa} 
                columnasTabla={columnasTabla()}
                dataKey="id_empl"
        ></DataTableComponent>   
        <Dialog
                visible={entidadDialog}
                style={{ width: "450px" }}
                header="Detalle FSA"
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
