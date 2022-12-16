import React, { useState, useEffect, useRef } from "react";
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { classNames } from "primereact/utils";
import Entidades from '../services/Entidades';
import jsPDF from "jspdf";
import FsaV2Report from "../reports/FsaV2Report";
import {PDFDownloadLink} from '@react-pdf/renderer';
import PsiReport from "../reports/PsiReport";
import axios from "axios";
import { Document, Page, Text, View, StyleSheet ,PDFViewer,Image,Font} from '@react-pdf/renderer';

const FsaV2 = () => {
    const conexion="http://localhost:8088/desa/bd/crud_uti.php";
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
    const [id_fsa,setId_fsa]=useState("");
    const [id_deta,setId_deta]=useState("");
    const [id_empl,setId_empl]=useState("");
    const [id_sist,setId_sist]=useState("");
    
    const [selectSistemas,setSelectSistemas]=useState([]);
    const [autorizadoPor,setAutorizadoPor]=useState("");

    const [autorizado, setAutorizado]=useState("Jefe");
    const [psi,setPsi]=useState(false);

    const [selectNotarios,setSelectNotarios]=useState([]);
    const [selectEmpresas,setSelectEmpresas]=useState([]);
    const [selectSeguridad,setSelectSeguridad]=useState([]);
    const [selectVerificadores,setSelectVerificadores]=useState([]);
    const [selectEntidades,setSelectEntidades]=useState([]);
    const [selectPide,setSelectPide]=useState([]);

    const [submitted,setSubmitted]=useState(false);

    //const [areaFilter, setAreaFilter]=useState([]);
    const [empleados,empleadosCombo,oficinas,oficinasCombo,perfiles,perfilCombo,estados,estadosCombo,areas,areasCombo,unidades,unidadesCombo]=Entidades();
    
    const [personas,setPersonas]=useState([]);
    const [sistemasFiltrados,setsistemasFiltrados]=useState([]);
    

    useEffect(() => {
        axios.post(conexion, { opcion: 21}).then((response) => setPersonas(response.data));
    }, [personas]);
    /*
    useEffect(() => {
        try{
        axios
            .post(conexion, {
                opcion: 23,
                id_empl:id_empl,
            })
            .then((response) => (setId_fsa(response.data[0]['id_fsa'])));}
        catch(e){
            setId_fsa("");
        }
    }, [guardarFsa]);
    */
    useEffect(() => {
        axios.post(conexion, {
            opcion: 24,
            id_fsa:id_fsa
        })
        .then((response) => (setId_deta(response.data))
        );
    }, [id_fsa]);
    
    /*
    const loadArea=(e)=>{
        setUnidad(e)
        let unidad_=unidadesCombo.filter(element => element.desc_unid===e);
        let area_=areasCombo.filter(element => element.id_unid===unidad_[0]['id_unid']);
        const area_prueba=[];
        for (let clave in area_){
            area_prueba.push(area_[clave].desc_area);
        };
        setAreaFilter(area_prueba)
    };
    */
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
    const mNotarios=[
        {name:'Consulta',key:'not0'},
        {name:'Asistente GR',key:'not1'},
    ];
    const mEmpresas=[
        {name:'Consulta',key:'emp0'},
        {name:'Asistente GR',key:'emp1'},
    ];
    const mSeguridad=[
        {name:'Administración',key:'seg0'},
    ];
    const mVerificadores=[
        {name:'Consulta',key:'ver0'},
        {name:'Administración',key:'ver1'},
        {name:'Registrador',key:'ver2'},
    ];
    const mEntidades=[
        {name:'Consulta',key:'ent0'},
        {name:'Administración',key:'ent1'},
    ];
    const mPide=[
        {name:'RENIEC',key:'pid0'},
        {name:'FMV',key:'pid1'},
    ];
    const onCategoryChange = (e) => {
        if(e.value.name==="PSI"){
            document.getElementById("psi").className="visible"
            setPsi(true);
        }
        let _selectedCategories = [...selectSistemas];
        if (e.checked) {
            _selectedCategories.push(e.value);
        } else {
            if(e.value.name==="PSI"){
                document.getElementById("psi").className="hidden"
                setPsi(false);
            }
            for (let i = 0; i < _selectedCategories.length; i++) {
                const selectedCategory = _selectedCategories[i];
                if (selectedCategory.key === e.value.key) {
                    _selectedCategories.splice(i, 1);
                    break;
                }
            }
        }
        setSelectSistemas(_selectedCategories);
    };
    const categotyPsi=(arraySelect,setArraySelect,e)=>{
        let _selectedCategories = [...arraySelect];
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
        setArraySelect(_selectedCategories);
    };
    const onChangePsi = (e,tipo) => {
        if(tipo==="notarios"){
            categotyPsi(selectNotarios,setSelectNotarios,e);
        }
        if(tipo==="empresas"){
            categotyPsi(selectEmpresas,setSelectEmpresas,e);
        }
        if(tipo==="seguridad"){
            categotyPsi(selectSeguridad,setSelectSeguridad,e);
        }
        if(tipo==="verificadores"){
            categotyPsi(selectVerificadores,setSelectVerificadores,e);
        }
        if(tipo==="entidades"){
            categotyPsi(selectEntidades,setSelectEntidades,e);
        }
        if(tipo==="pide"){
            categotyPsi(selectPide,setSelectPide,e);
        }
    };
    const autorizadoView=()=>{
        if(autorizado==="Jefe"){
            return(
                <div key="sdd">
                    <label className='col-12 md:col-3 text-left font-semibold' htmlFor="jefe">Jefe de la Unidad/Jefe Inmediato:</label>
                    <InputText className='col-12 md:col-7' 
                        id="jefe"
                        value={autorizadoPor}
                        placeholder="Ingrese Nombre del jefe"
                        onChange={(e) => setAutorizadoPor(e.target.value)}
                    />    
                </div>       
            );
        }else{
            return(
                <div key="dfsd">
                    <label className='col-12 md:col-3 text-left font-semibold' htmlFor="documento">Documento:</label>
                    <InputText className='col-12 md:col-7' 
                        id="documento"
                        value={autorizadoPor}
                        placeholder="Documento que sustenta la autorizacion"
                        onChange={(e) => setAutorizadoPor(e.target.value)}
                    />
                </div>
            );
        }
    };
    const clearData=()=>{
        setNombre("");
        setDni("");
        setNombre("");
        setApePaterno("");
        setApeMaterno("");
        setCorreo("");
        setOficina("");
        setUnidad("");
        setArea("");
        setCargo("");
        setDirIp("");
        setSustento("");
        setSelectSistemas([]);
        setAutorizadoPor("");
        setAutorizado("Jefe");
        setPsi(false);
        setSelectNotarios([]);
        setSelectEmpresas([]);
        setSelectSeguridad([]);
        setSelectVerificadores([]);
        setSelectEntidades([]);
        setSelectPide([]);
        setSubmitted(false);
        //setAreaFilter([])
    };
    
    const psipdf=()=>{
        if(psi){
            return(
                <PDFDownloadLink document={PsiReport({dni,nombre,apePaterno,apeMaterno,correo,cargo,unidad,oficina,autorizadoPor,
                    selectNotarios,selectEmpresas,selectSeguridad,selectVerificadores,selectEntidades,selectPide,
                    mNotarios,mEmpresas,mSeguridad,mVerificadores,mEntidades,mPide})} fileName={("PSI - "+nombre+" "+apePaterno+" "+apeMaterno).toUpperCase()}>
                    {((nombre===""|| dni===""||apeMaterno===""||apePaterno==="") ? <Button label="Falta Completar datos (PSI)" className="p-button-warning underline:none" icon="pi pi-info-circle" disabled/> : <Button label="Generar (PSI)"className="p-button-success" type="submit" icon="pi pi-file-export" onClick={prueba}/>)}
                </PDFDownloadLink>
                
            )
        }
    };
   
    function buscarFsa(_id_empl){
        axios.post(conexion, {
            opcion: 22,
            id_empl:_id_empl
        })
        .then((response) => {
            if(response.data.length>0){
                setId_fsa(response.data[0]['id_fsa']);  
            }
        });
    };

    function buscarEmpleado(){
        let persona=personas.filter(element => element.dni_empl===dni);
        if(persona.length>0){
            setId_empl(persona[0]['id_empl']);
            setNombre(persona[0]['nomb_empl']);
            setApePaterno(persona[0]['ape_pate_empl']);
            setApeMaterno(persona[0]['ape_mate_empl']);
            setCorreo(persona[0]['desc_mail']);
            //setDirIp();
            setOficina(persona[0]['desc_ofic']);
            setUnidad(persona[0]['desc_unid']);
            setArea(persona[0]['desc_area']);
            setCargo(persona[0]['desc_perf']);
            //ids
            buscarFsa(persona[0]['id_empl']);
        }else{
            console.log("no exiete");
        }
    };
   
    async function guardarSistemas(){
        console.log("id_deta "+id_deta);
        for(let i in selectSistemas){    
            axios
            .post(conexion, {
                opcion: 28,
                id_deta:id_deta,
                nomb_sist:selectSistemas[i]['name']
            })
            .then((response) => (console.log(response)));
        };
    };
    
    const guardar=async()=>{
        //GUARDAR FSA
        if(id_fsa==""){
            await axios
            .post(conexion, {
                opcion: 25,
                id_empl:id_empl,
            })
            .then((response) => (console.log(response)));
            console.log("empl "+id_empl);
            //recuperar id fsa
            await axios
            .post(conexion, {
                opcion: 23,
                id_empl:id_empl,
            })
            .then((response) => (setId_fsa(response.data)));
            console.log("fsa "+id_fsa);
            
        }else{
            buscarFsa(id_empl);
        }
        //GUARDAR DETA
        //console.log("fsa "+id_fsa);
        await axios
        .post(conexion, {
            opcion: 26,
            sustento:sustento,
            autorizado_por:autorizadoPor,
            id_fsa: id_fsa,
        })
        .then((response) => (console.log(response)));
        //GUADRA SISTEMAS
        guardarSistemas();
    };
    
    const prueba=async()=>{
        setSubmitted(true);
        await guardar();
        //clearData();
    };
    
    
    
    
    return (
    <div className='card'>
        <div className=" table-header">
             <h2>SOLICITUD DE ACCESOS</h2>
             <div><Button label="Limpiar" className="p-button-secondary"  onClick={clearData} /></div>
            
        </div>
        <div>
            <Divider align="left">
                <div className="inline-flex align-items-center">
                    <i className="pi pi-user mr-2"></i>
                    <b>DATOS PERSONALES</b>
                </div>
            </Divider>
            <div className="grid ml-4 mt-4 text-sm">
                <div className='col-12 md:col-4 grid '>     
                    <label className='col-12 md:col-3 text-left font-semibold' htmlFor="dni">DNI :</label>
                    <InputText className={classNames({"p-invalid": submitted&& dni===""},'col-12 md:col-8')}
                        id="dni"
                        value={dni}
                        placeholder="Ingrese número DNI"
                        onChange={(e) => setDni(e.target.value)}
                        autoFocus
                    />
                    {submitted && dni==="" &&(
                    <small className="ml-2 p-error col-12 p-0">Falta DNI</small>)}  
                </div>
                <div className='col-12 md:col-4 text-left'>
                    <Button label="Buscar" className="p-button-secondary"  onClick={buscarEmpleado} />
                </div>
                <div className='col-12 md:col-4 text-right text-gray-500 font-semibold'>
                    <p className="p-p m-0 text-4xl">FSA N° {id_fsa}</p>
                </div>
            </div>
            <div className="grid ml-4 mt-4 text-sm">
                <div className='col-12 md:col-4 grid '>     
                    <label className='col-12 md:col-3 text-left font-semibold' htmlFor="nombre">Nombres :</label>
                    <InputText className={classNames({"p-invalid": submitted&& nombre===""},'col-12 md:col-8 pt-1')}
                        id="nombre"
                        value={nombre}
                        placeholder="Ingrese nombre"
                        onChange={(e) => setNombre(e.target.value)}
                        autoFocus
                    />
                    {submitted && nombre==="" &&(
                    <small className="ml-2 p-error col-12 p-0">Falta nombre</small>)}  
                </div>
                <div className='col-12 md:col-4 grid '>     
                    <label className='col-12 md:col-3 text-left font-semibold' htmlFor="apePaterno">Apellido paterno :</label>
                    <InputText className={classNames({"p-invalid": submitted&& apePaterno===""},'col-12 md:col-8')}
                        id="apePaterno"
                        value={apePaterno}
                        placeholder="Ingrese apellido paterno"
                        onChange={(e) => setApePaterno(e.target.value)}
                        autoFocus
                    />
                    {submitted && apePaterno==="" &&(
                    <small className="ml-2 p-error col-12 p-0">Falta apellido paterno</small>)}  
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left font-semibold' htmlFor="apeMaterno">Apellido materno :</label>
                    <InputText className={classNames({"p-invalid": submitted&& apeMaterno===""},'col-12 md:col-8')}
                        id="apeMaterno"
                        value={apeMaterno}
                        placeholder="Ingrese apellido materno"
                        onChange={(e) => setApeMaterno(e.target.value)}
                        autoFocus
                    />
                    {submitted && apeMaterno==="" &&(
                    <small className="ml-2 p-error col-12 p-0">Falta apellido materno</small>)}  
                </div>
            </div>
            <div className="grid ml-4 mt-4 text-sm">
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left font-semibold' htmlFor="Correo">Correo eletrónico :</label>
                    <InputText className='col-12 md:col-8' 
                        id="Correo"
                        value={correo}
                        placeholder="Ingrese correo"
                        onChange={(e) => setCorreo(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left font-semibold' htmlFor="dirIp">IP :</label>
                    <InputText className='col-12 md:col-8' 
                        id="dirIp"
                        value={dirIp}
                        placeholder="Ingrese dirección ip"
                        onChange={(e) => setDirIp(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left font-semibold' htmlFor="oficina">Oficina :</label>
                    <Dropdown id="oficina" className="col-12 md:col-8 text-left"  value={oficina} options={oficinas} onChange={(e)=>setOficina(e.value)} placeholder="Ingrese oficina" filter/>
                </div>
            </div>
            <div className="grid ml-4 mt-4 text-sm">
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left font-semibold' htmlFor="unidad">Unidad :</label>
                    <Dropdown id="unidad" className="col-12 md:col-8 text-left"  value={unidad} options={unidades} onChange={(e)=>setUnidad(e.value)} placeholder="Ingrese unidad" filter/>
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left font-semibold' htmlFor="area">Área :</label>
                    <Dropdown id="area" className="col-12 md:col-8 text-left"  value={area} options={areas} onChange={(e)=>setArea(e.value)} placeholder="Ingrese area" filter />
                </div>
                <div className='col-12 md:col-4 grid'>     
                    <label className='col-12 md:col-3 text-left font-semibold' htmlFor="cargo">Cargo :</label>
                    <Dropdown id="cargo" className="col-12 md:col-8 text-left"  value={cargo} options={perfiles} onChange={(e)=>setCargo(e.value)} placeholder="Ingrese cargo" filter/>
                </div>
            </div>
        </div>
        <div>
            <Divider align="left">
                <div className="inline-flex align-items-center">
                    <i className="pi pi-desktop mr-2"></i>
                    <b>SISTEMAS</b>
                </div>
            </Divider>
            <div className="grid ml-4 text-sm">
                <div className="field-checkbox block col-12 md:col-4  text-left">
                    <p className="font-semibold">Sistemas Registrales</p>
                    {
                        listRegistrales.map((category) => {
                            return (
                                <div key={category.key} className="field-checkbox ">
                                    <Checkbox inputId={category.key} name="registrales" value={category} onChange={(e)=>onCategoryChange(e)} checked={selectSistemas.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="field-checkbox block col-12 md:col-4  text-left">
                    <p className="font-semibold">Sistemas Web</p>
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
                    <p className="mt-5 font-semibold">Sistemas Administrativos</p>
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
                    <p className="font-semibold">Informática/Otros</p>
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
                    <p className="mt-5 font-semibold">Antivirus McAfee</p>
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
            <div id="psi"className="hidden">
                <p className="font-semibold text-left ml-5 mt-0 pt-0">PSI</p>
                <div className="grid text-sm ml-4">
                    <div className="col-12 md:col-2">
                        <p className=" font-semibold text-left">Módulo de Notarios</p>
                        {mNotarios.map((category) => {
                            return (
                                <div key={category.key} className="field-checkbox ">
                                    <Checkbox inputId={category.key} name="notarios" value={category} onChange={(e)=>onChangePsi(e,'notarios')} checked={selectNotarios.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-12 md:col-2">
                        <p className=" font-semibold text-left">Módulo de Empresas</p>
                        {mEmpresas.map((category) => {
                            return (
                                <div key={category.key} className="field-checkbox ">
                                    <Checkbox inputId={category.key} name="empresas" value={category} onChange={(e)=>onChangePsi(e,'empresas')} checked={selectEmpresas.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-12 md:col-2">
                        <p className=" font-semibold text-left">Módulo Seguridad</p>
                        {mSeguridad.map((category) => {
                            return (
                                <div key={category.key} className="field-checkbox ">
                                    <Checkbox inputId={category.key} name="seguridad" value={category} onChange={(e)=>onChangePsi(e,'seguridad')} checked={selectSeguridad.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-12 md:col-2">
                        <p className=" font-semibold text-left">Módulo de Verificadores</p>
                        {mVerificadores.map((category) => {
                            return (
                                <div key={category.key} className="field-checkbox ">
                                    <Checkbox inputId={category.key} name="verificadores" value={category} onChange={(e)=>onChangePsi(e,'verificadores')} checked={selectVerificadores.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-12 md:col-2">
                        <p className=" font-semibold text-left">Módulo de Entidades</p>
                        {mEntidades.map((category) => {
                            return (
                                <div key={category.key} className="field-checkbox ">
                                    <Checkbox inputId={category.key} name="entidades" value={category} onChange={(e)=>onChangePsi(e,'entidades')} checked={selectEntidades.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-12 md:col-2">
                        <p className=" font-semibold text-left">Módulo PIDE</p>
                        {mPide.map((category) => {
                            return (
                                <div key={category.key} className="field-checkbox ">
                                    <Checkbox inputId={category.key} name="pide" value={category} onChange={(e)=>onChangePsi(e,'pide')} checked={selectPide.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Divider align="left">
                <div className="inline-flex align-items-center">
                    <i className="pi pi-check-square mr-2"></i>
                    <b>DATOS DE AUTORIZACIÓN</b>
                </div>
            </Divider>
            <div className="grid ml-4  text-left text-sm">
                <div className="col-12 md:col-4">
                    <label className='block mb-2 font-semibold' htmlFor="sustento">Sustento:</label>
                    <InputTextarea id="sustento" className="col-12" rows={2} value={sustento} onChange={(e) => setSustento(e.target.value)} autoResize placeholder="Ingrese sustento de la autorización" />
                </div>
                <div className="col-12 md:col-8">
                    <label className='block mb-2 font-semibold' htmlFor="autorizado">Autorizado por:</label>
                    <div className="grid my-auto">
                        <SelectButton id="autorizado" className="mb-2 col-12 md:col-4 " value={autorizado} options={listAutorizado} onChange={(e) => setAutorizado(e.value)} />
                        <div className="col-12 md:col-8">
                            {autorizadoView()}
                        </div>
                    </div>      
                </div>
            </div>
            {psipdf()}
            
              <PDFDownloadLink 
                    document={FsaV2Report({dni,nombre,apePaterno,apeMaterno,correo,oficina,unidad,area,cargo,dirIp,sustento,
                    selectSistemas,autorizadoPor,autorizado})} 
                    fileName={("FSA - "+nombre+" "+apePaterno+" "+apeMaterno).toUpperCase()}
                    
                >
                    {((nombre===""|| dni===""||apeMaterno===""||apePaterno==="") ? <Button label="Falta Completar datos (FSA)" className="p-button-warning underline:none" icon="pi pi-info-circle" disabled/> : <Button label="Generar (FSA) y Guardar"className="p-button-success" type="submit" icon="pi pi-file-export" onClick={prueba}/>)}
                </PDFDownloadLink>
        </div>   
    </div>
  )
}

export default FsaV2