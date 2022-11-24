import React, { useState, useEffect, useRef } from "react";
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import Entidades from '../services/Entidades';

const FsaV2 = () => {
    const [dni,setDni]=useState(null);
    const [nombre,setNombre]=useState(null);
    const [apePaterno,setApePaterno]=useState(null);
    const [apeMaterno,setApeMaterno]=useState(null);
    const [correo,setCorreo]=useState(null);
    const [oficina,setOficina]=useState(null);
    const [unidad,setUnidad]=useState(null);
    const [area,setArea]=useState(null);
    const [cargo,setCargo]=useState(null);
    const [dirIp,setDirIp]=useState(null);
    const [sustento,setSustento]=useState(null);
    
    const [selectRegistrales,setSelectRegistral]=useState([]);
    const [selectWeb,setSelectWeb]=useState([]);
    const [selectAdmi,setSelectAdmi]=useState([]);
    const [selectInfo,setSelectInfo]=useState([]);
    const [selectAnti,setSelectAnti]=useState([]);

    const listAutorizado=[
        {name:"Jefe",key:'aut0'},
        {name:"Documento",key:'aut1'},
    ]
    const [autorizado,setAutorizado]=useState([]);
    const [selectAutorizado,setSelectAutorizado]=useState([listAutorizado[0]]);

    const [cities, setCities] = useState([]);
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

    
   
    const change=(e,selectArray, setSelectArray)=>{
        let _selectedCategories = [...selectArray];
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
        setSelectArray(_selectedCategories);
    };
    const onCategoryChange = (e, tipo) => {
        if(tipo="registrales"){
            change(e,selectRegistrales,setSelectRegistral);
        }
        if(tipo="web"){
            change(e,selectWeb,setSelectWeb);
        }
        if(tipo="administrativos"){
            change(e,selectAdmi,setSelectAdmi);
        }
        if(tipo="informatica"){
            change(e,selectInfo,setSelectInfo);
        }
        if(tipo="antivirus"){
            change(e,selectAnti,setSelectAnti);
        }
        if(tipo="autorizado"){
            
        }
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
                        <label className='col-12 md:col-3 text-left' htmlFor="nombre">NOMBRE:</label>
                        <InputText className='col-12 md:col-7 ' 
                            id="nombre"
                            value={nombre}
                            placeholder="Nombre"
                        />
                </div>
                <div className='col-12 md:col-4 grid'>     
                        <label className='col-12 md:col-3 text-left' htmlFor="apePaterno">APELLIDO PATERNO:</label>
                        <InputText className='col-12 md:col-7' 
                            id="apePaterno"
                            value={apePaterno}
                            placeholder="Apellido paterno"
                        />
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left' htmlFor="apeMaterno">APELLIDO MATERNO:</label>
                    <InputText className='col-12 md:col-7' 
                        id="apeMaterno"
                        value={apeMaterno}
                        placeholder="Apellido materno"
                    />
                </div>
            </div>
            <div className="grid ml-4 mt-4">
                <div className='col-12 md:col-4 grid'>     
                        <label className='col-12 md:col-3 text-left' htmlFor="Correo">CORREO ELECTRONICO:</label>
                        <InputText className='col-12 md:col-7' 
                            id="Correo"
                            value={correo}
                            placeholder="Correo"
                        />
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left' htmlFor="dirIp">DIRECCION IP:</label>
                    <InputText className='col-12 md:col-7' 
                        id="dirIp"
                        value={dirIp}
                        placeholder="Direccion ip"
                    />
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left' htmlFor="oficina">OFICINA:</label>
                    <Dropdown id="oficina" className="col-12 md:col-7 text-left"  value={oficina} options={oficinas} placeholder="Oficina" filter/>
                </div>
            </div>
            <div className="grid ml-4 mt-4">
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left' htmlFor="unidad">UNIDAD:</label>
                    <Dropdown id="unidad" className="col-12 md:col-7 text-left"  value={area} options={areas} placeholder="Oficina" filter/>
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left' htmlFor="area">AREA:</label>
                    <Dropdown id="area" className="col-12 md:col-7 text-left"  value={area} options={areas} placeholder="Area" filter />
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left' htmlFor="cargo">CARGO:</label>
                    <Dropdown id="cargo" className="col-12 md:col-7 text-left"  value={cargo} options={perfiles} placeholder="Cargo" filter/>
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
                                    <Checkbox inputId={category.key} name="registrales" value={category} onChange={(e)=>onCategoryChange(e,"registrales")} checked={selectRegistrales.some((item) => item.key === category.key)} />
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
                                    <Checkbox inputId={category.key} name="web" value={category} onChange={(e)=>onCategoryChange(e,"web")} checked={selectWeb.some((item) => item.key === category.key)} />
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
                                    <Checkbox inputId={category.key} name="administrativos" value={category} onChange={(e)=>onCategoryChange(e,"administrativos")} checked={selectAdmi.some((item) => item.key === category.key)} />
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
                                    <Checkbox inputId={category.key} name="informaticos" value={category} onChange={(e)=>onCategoryChange(e,"informatica")} checked={selectInfo.some((item) => item.key === category.key)} />
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
                                    <Checkbox inputId={category.key} name="antivirus" value={category} onChange={(e)=>onCategoryChange(e,"antivirus")} checked={selectAnti.some((item) => item.key === category.key)} />
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
                    <label className='block mb-2' htmlFor="cargo">SUSTENTO:</label>
                    <InputTextarea className="col-12" rows={3} value={sustento} autoResize />
                </div>
                <div className="col-12 md:col-6 ml-8">
                    {listAutorizado.map((category) => {
                        return (
                            <div key={category.key} className="field-checkbox">
                                <Checkbox inputId={category.key} name="autorizado" value={category} onChange={(e)=>onCategoryChange(e,"autorizado")} checked={selectAutorizado.some((item) => item.key === category.key)} />
                                <label htmlFor={category.key}>{category.name}</label>
                            </div>
                        )
                        })
                    }
                </div>
            </div>
        </div>       
    </div>
  )
}

export default FsaV2