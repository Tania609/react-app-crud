import React, { useState, useEffect, useRef } from "react";
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import Entidades from '../services/Entidades';
import jsPDF from "jspdf";
import FsaV2Report from "../reports/FsaV2Report";

const FsaV2 = () => {
    const [dni,setDni]=useState("");
    const [nombre,setNombre]=useState("");
    const [apePaterno,setApePaterno]=useState("");
    const [apeMaterno,setApeMaterno]=useState("");
    const [correo,setCorreo]=useState("");
    const [oficina,setOficina]=useState("");
    const [unidad,setUnidad]=useState("");
    const [area,setArea]=useState("");
    const [cargo,setCargo]=useState("");
    const [dirIp,setDirIp]=useState("");
    const [sustento,setSustento]=useState("");
    
    const [selectSistemas,setSelectSistemas]=useState([]);
    const [autorizadoPor,setAutorizadoPor]=useState("");

    const [autorizado, setAutorizado]=useState("Jefe");

    const [empleados,empleadosCombo,oficinas,oficinasCombo,perfiles,perfilCombo,estados,estadosCombo,areas,areasCombo]=Entidades();
     
    const listRegistrales=[
        {name:"Usuario Windows",key:'"Reg0'},
        {name:"Consulta Registral",key:'Reg1'},
        {name:"Indice Verificadores",key:'Reg2'},
        {name:"Libro Diario",key:'Reg3'},
        {name:"Mesa de Partes",key:'Reg4'},
        {name:"RPU Gráfico",key:'Reg5'},
        {name:"SARP",key:'Reg6'},
        {name:"SCUNAC",key:'Reg7'},
        {name:"SEPR",key:'Reg8'},
        {name:"SIGESAR",key:'Reg9'},
        {name:"SIR",key:'Reg10'},
        {name:"SIR Minero",key:'Reg11'},
        {name:"SIR RPV",key:'Reg12'},
        {name:"SOU",key:'Reg13'},
        {name:"SPIJ",key:'Reg14'},
        {name:"SPR",key:'Reg15'},
        {name:"SPRN",key:'Reg16'},
        {name:"TOOLGIS",key:'Reg17'},
    ];
    const listWeb=[
        {name:"Citrix",key:'web0'},
        {name:"Correo Institucional",key:'web1'},
        {name:"PSI",key:'web2'},
        {name:"RENIEC",key:'web3'},
        {name:"SGIT",key:'web4'},
        {name:"SPRL - Extranet",key:'web5'},
    ];
    const listAdministrativos=[
        {name:"Devoluciones",key:'adm0'},
        {name:"Melissa",key:'adm1'},
        {name:"Modulo Logistica",key:'adm2'},
        {name:"SIAF",key:'adm3'},
        {name:"SICA",key:'adm4'},
        {name:"SIGA",key:'adm5'},
        {name:"SISABA",key:'adm6'},
        {name:"SISTRAM",key:'adm7'},
        {name:"SUTESOR",key:'adm8'},
        {name:"Registro de Visitas",key:'adm9'},
    ];
    const listInformatica=[
        {name:"Base de Datos",key:'inf0'},
        {name:"KeyFile",key:'inf1'},
        {name:"VMWARE",key:'inf2'},
        {name:"VPN",key:'inf3'},
    ];
    const listAntivirus=[
        {name:"Bloqueo USB/CD",key:'ant0'},
        {name:"USB (R / W)",key:'ant1'},
        {name:"USB (Lectura)",key:'ant2'},
        {name:"CD (R / W)",key:'ant3'},
        {name:"CD (Lectura)",key:'ant4'},
        {name:"Usuario Consola McAfee",key:'ant5'},
    ];
    const listAutorizado=['Jefe','Documento']
    
    const onCategoryChange = (e) => {
        let _selectedCategories = [...selectSistemas];
        if (e.checked) {
            _selectedCategories.push(e.value);
        } else {
            for (let i = 0; i < _selectedCategories.length; i++) {
                const selectedCategory = _selectedCategories[i];
                if (selectedCategory.key === e.value.key) {
                    _selectedCategories.splice(i, 1);
                    break;
                }
            }
        }
        setSelectSistemas(_selectedCategories);
    }
    const autorizadoView=()=>{
        if(autorizado==="Jefe"){
            return(
                <div key="sdd">
                    <label className='col-12 md:col-3 text-left' htmlFor="jefe">Jefe de la Unidad/Jefe Inmediato:</label>
                    <InputText className='col-12 md:col-7' 
                        id="jefe"
                        value={autorizadoPor}
                        placeholder="Ingrese Nombre del jefe"
                    />    
                </div>       
            );
        }else{
            return(
                <div key="dfsd">
                    <label className='col-12 md:col-3 text-left' htmlFor="documento">Documento:</label>
                    <InputText className='col-12 md:col-7' 
                        id="documento"
                        value={autorizadoPor}
                        placeholder="Documento que sustenta la autorizacion"
                    />
                </div>
            );
        }
    };
    const jsPdfGenerator=()=>{
        var doc=new jsPDF('p','pt');
        
        doc.text(20,20,"Title");
        doc.text(100,200,"prueb");
        doc.cell(80,6,"ZONA REGISTRAL N° X - SEDE CUSCO",0,1,"C");
        doc.save("FSA.pdf")
    };
    const FsaV2Report_=()=>{
        console.log(nombre);
        return (FsaV2Report({dni,nombre,apePaterno,apeMaterno,correo,oficina,unidad,area,cargo,dirIp,sustento,
            selectSistemas,autorizadoPor}));
    }
    return (
    <div className='card'>
        <h1>SOLICITUD DE ACCESOS</h1>
        <div>
            <Divider align="left">
                <div className="inline-flex align-items-center">
                    <i className="pi pi-user mr-2"></i>
                    <b>DATOS PERSONALES</b>
                </div>
            </Divider>
            <div className="grid ml-4 mt-4">
                <div className='col-12 md:col-4 grid'>     
                        <label className='col-12 md:col-3 text-left' htmlFor="nombre">NOMBRES:</label>
                        <InputText className='col-12 md:col-7 ' 
                            id="nombre"
                            value={nombre}
                            placeholder="Ingrese nombre"
                            onChange={(e) => setNombre(e.target.value)}
                        />
                </div>
                <div className='col-12 md:col-4 grid'>     
                        <label className='col-12 md:col-3 text-left' htmlFor="apePaterno">APELLIDO PATERNO:</label>
                        <InputText className='col-12 md:col-7' 
                            id="apePaterno"
                            value={apePaterno}
                            placeholder="Ingrese apellido paterno"
                            onChange={(e) => setApePaterno(e.target.value)}
                        />
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left' htmlFor="apeMaterno">APELLIDO MATERNO:</label>
                    <InputText className='col-12 md:col-7' 
                        id="apeMaterno"
                        value={apeMaterno}
                        placeholder="Ingrese apellido materno"
                        onChange={(e) => setApeMaterno(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid ml-4 mt-4">
                <div className='col-12 md:col-4 grid'>     
                        <label className='col-12 md:col-3 text-left' htmlFor="Correo">CORREO ELECTRONICO:</label>
                        <InputText className='col-12 md:col-7' 
                            id="Correo"
                            value={correo}
                            placeholder="Ingrese correo"
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left' htmlFor="dirIp">DIRECCION IP:</label>
                    <InputText className='col-12 md:col-7' 
                        id="dirIp"
                        value={dirIp}
                        placeholder="Ingrese direccion ip"
                        onChange={(e) => setDirIp(e.target.value)}
                    />
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left' htmlFor="oficina">OFICINA:</label>
                    <Dropdown id="oficina" className="col-12 md:col-7 text-left"  value={oficina} options={oficinas} placeholder="Ingrese oficina" filter/>
                </div>
            </div>
            <div className="grid ml-4 mt-4">
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left' htmlFor="unidad">UNIDAD:</label>
                    <Dropdown id="unidad" className="col-12 md:col-7 text-left"  value={area} options={areas} placeholder="Ingrese unidad" filter/>
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left' htmlFor="area">AREA:</label>
                    <Dropdown id="area" className="col-12 md:col-7 text-left"  value={area} options={areas} placeholder="Ingrese area" filter />
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left' htmlFor="cargo">CARGO:</label>
                    <Dropdown id="cargo" className="col-12 md:col-7 text-left"  value={cargo} options={perfiles} placeholder="Ingrese cargo" filter/>
                </div>
            </div>
        </div>
        <div>
            <Divider align="left">
                <div className="inline-flex align-items-center">
                    <i className="pi pi-user mr-2"></i>
                    <b>SISTEMAS</b>
                </div>
            </Divider>
            <div className="grid ml-4">
                <div className="field-checkbox block col-12 md:col-4  text-left">
                    <h4>Sistemas Registrales</h4>
                    {
                        listRegistrales.map((category) => {
                            return (
                                <div key={category.key} className="field-checkbox">
                                    <Checkbox inputId={category.key} name="registrales" value={category} onChange={(e)=>onCategoryChange(e)} checked={selectSistemas.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="field-checkbox block col-12 md:col-4  text-left">
                    <h4>Sistemas Web</h4>
                    {
                        listWeb.map((category) => {
                            return (
                                <div key={category.key} className="field-checkbox">
                                    <Checkbox inputId={category.key} name="web" value={category} onChange={(e)=>onCategoryChange(e)} checked={selectSistemas.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            )
                        })
                    }
                    <h4 className="mt-5">Sistemas Administrativos</h4>
                    {
                        listAdministrativos.map((category) => {
                            return (
                                <div key={category.key} className="field-checkbox">
                                    <Checkbox inputId={category.key} name="administrativos" value={category} onChange={(e)=>onCategoryChange(e)} checked={selectSistemas.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="field-checkbox block col-12 md:col-4  text-left">
                    <h4>Informática/Otros</h4>
                    {
                        listInformatica.map((category) => {
                            return (
                                <div key={category.key} className="field-checkbox">
                                    <Checkbox inputId={category.key} name="informaticos" value={category} onChange={(e)=>onCategoryChange(e)} checked={selectSistemas.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            )
                        })
                    }
                    <h4 className="mt-5">Antivirus McAfee</h4>
                    {
                        listAntivirus.map((category) => {
                            return (
                                <div key={category.key} className="field-checkbox">
                                    <Checkbox inputId={category.key} name="antivirus" value={category} onChange={(e)=>onCategoryChange(e)} checked={selectSistemas.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        <div>
            <Divider align="left">
                <div className="inline-flex align-items-center">
                    <i className="pi pi-user mr-2"></i>
                    <b>DATOS DE AUTORIZACIÓN</b>
                </div>
            </Divider>
            <div className="grid ml-4  text-left">
                <div className="col-12 md:col-4">
                    <label className='block mb-2' htmlFor="sustento">SUSTENTO:</label>
                    <InputTextarea id="sustento" className="col-12" rows={2} value={sustento} onChange={(e) => setSustento(e.target.value)} autoResize />
                </div>
                <div className="col-12 md:col-8">
                    <label className='block mb-2' htmlFor="autorizado">AUTORIZADO POR:</label>
                    <div className="grid">
                        <SelectButton id="autorizado" className="mb-2 col-12 md:col-3" value={autorizado} options={listAutorizado} onChange={(e) => setAutorizado(e.value)} />
                        <div className="col-12 md:col-9">
                            {autorizadoView()}
                        </div>
                    </div>      
                </div>
            </div>
            <Button className="p-button-success" label="Generar PDF" />
            {FsaV2Report_()}
        </div>   
    </div>
  )
}

export default FsaV2