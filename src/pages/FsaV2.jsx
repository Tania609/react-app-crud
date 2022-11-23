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
    const [cities, setCities] = useState([]);
    const [empleados,empleadosCombo,oficinas,oficinasCombo,perfiles,perfilCombo,estados,estadosCombo,areas,areasCombo]=Entidades();
     
    const listRegistrales=[
        {name:"Usuario Windows",key:'0'},
        {name:"Consulta Registral",key:'1'},
        {name:"Indice Verificadores",key:'2'},
        {name:"Libro Diario",key:'3'},
        {name:"Mesa de Partes",key:'4'},
        {name:"RPU Gráfico",key:'5'},
        {name:"SARP",key:'6'},
        {name:"SCUNAC",key:'7'},
        {name:"SEPR",key:'8'},
        {name:"SIGESAR",key:'9'},
        {name:"SIR",key:'10'},
        {name:"SIR Minero",key:'11'},
        {name:"SIR RPV",key:'12'},
        {name:"SOU",key:'13'},
        {name:"SPIJ",key:'14'},
        {name:"SPR",key:'15'},
        {name:"SPRN",key:'16'},
        {name:"TOOLGIS",key:'17'},
    ];
    const listWeb=[
        {name:"Citrix",key:'0'},
        {name:"Correo Institucional",key:'1'},
        {name:"PSI",key:'2'},
        {name:"RENIEC",key:'3'},
        {name:"SGIT",key:'4'},
        {name:"SPRL - Extranet",key:'5'},
    ];
    const listAdministrativos=[
        {name:"Devoluciones",key:'0'},
        {name:"Melissa",key:'1'},
        {name:"Modulo Logistica",key:'2'},
        {name:"SIAF",key:'3'},
        {name:"SICA",key:'4'},
        {name:"SIGA",key:'5'},
        {name:"SISABA",key:'6'},
        {name:"SISTRAM",key:'7'},
        {name:"SUTESOR",key:'8'},
        {name:"Registro de Visitas",key:'9'},
    ];
    const listInformatica=[
        {name:"Base de Datos",key:'0'},
        {name:"KeyFile",key:'1'},
        {name:"VMWARE",key:'2'},
        {name:"VPN",key:'3'},
    ];
    const listAntivirus=[
        {name:"Bloqueo USB/CD",key:'0'},
        {name:"USB (R / W)",key:'1'},
        {name:"USB (Lectura)",key:'2'},
        {name:"CD (R / W)",key:'3'},
        {name:"CD (Lectura)",key:'4'},
        {name:"Usuario Consola McAfee",key:'5'},
    ];
   
    const onCategoryChange = (e) => {
        let _selectedCategories = [...selectRegistrales];

        if (e.checked) {
            _selectedCategories.push(e.value);
        }
        else {
            for (let i = 0; i < _selectedCategories.length; i++) {
                const selectedCategory = _selectedCategories[i];

                if (selectedCategory.key === e.value.key) {
                    _selectedCategories.splice(i, 1);
                    break;
                }
            }
        }

        setSelectRegistral(_selectedCategories);
    }
    const onCityChange = (e) => {
        let selectedCities = [...cities];

        if (e.checked)
            selectedCities.push(e.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);

        setCities(selectedCities);
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
                                    <Checkbox inputId={category.key} name="category" value={category} onChange={onCategoryChange} checked={selectRegistrales.some((item) => item.key === category.key)} />
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
                                    <Checkbox inputId={category.key} name="category" value={category} onChange={onCategoryChange} checked={selectRegistrales.some((item) => item.key === category.key)} />
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
                                    <Checkbox inputId={category.key} name="category" value={category} onChange={onCategoryChange} checked={selectRegistrales.some((item) => item.key === category.key)} />
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
                                    <Checkbox inputId={category.key} name="category" value={category} onChange={onCategoryChange} checked={selectRegistrales.some((item) => item.key === category.key)} />
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
                                    <Checkbox inputId={category.key} name="category" value={category} onChange={onCategoryChange} checked={selectRegistrales.some((item) => item.key === category.key)} />
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
                    <label className='block mb-2' htmlFor="cargo">AUTORIZADO POR:</label>
                    <div className="field-checkbox inline">
                        <Checkbox inputId="city1" name="city" value="Chicago" onChange={onCityChange} checked={cities.indexOf('Chicago') !== -1} />
                        <label htmlFor="city1">Jefe</label>
                    </div>
                    <div className="field-checkbox inline">
                        <Checkbox inputId="city2" name="city" value="Los Angeles" onChange={onCityChange} checked={cities.indexOf('Los Angeles') !== -1} />
                        <label htmlFor="city2">Documento</label>
                    </div>
                </div>
            </div>
        </div>       
    </div>
  )
}

export default FsaV2