import React from 'react';
import logo from '../images/logo.png';
import footer from '../images/footer.png';
import { Document, Page, Text, View, StyleSheet ,PDFViewer,Image,PDFDownloadLink,Font} from '@react-pdf/renderer';

const PsiReport = ({dni,nombre,apePaterno,apeMaterno,correo,cargo,unidad,oficina,autorizadoPor,
    selectNotarios,selectEmpresas,selectSeguridad,selectVerificadores,selectEntidades,selectPide,
    mNotarios,mEmpresas,mSeguridad,mVerificadores,mEntidades,mPide}) => {

    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            fontSize: 10,
            paddingTop: 25,
            paddingLeft:20,
            paddingRight:20,
            lineHeight: 1.5,
            flexDirection: 'column',
        }, 
        logo: {
            width: 120,
            height: 60,
        },
        titleContainer:{
            flexDirection: 'row',
            marginTop: 20,
            flexWrap:'wrap',
        },
        marginAuto:{
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        marginYauto:{
            marginBottom:'auto',
            marginTop:'auto'
        },
        bold:{
            fontFamily: 'Helvetica-Bold',
        },
        underline: {textDecoration: 'underline'},
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        item50: {
            width: '50%',
        },
        item70: {
            width: '70%',
        },
        item30: {
            width: '30%',
        },
        containerBody:{
            marginTop:15,
            border:1,
            paddingTop:15,
            paddingBottom:15,
            paddingLeft:10,
            borderColor:'#99A3A4'
        },
        containerSub:{
            marginLeft:4,
            marginTop:8,
        },
        textItems:{
            fontFamily: 'Helvetica-Bold',
            fontSize:10
        },
        tableItems:{
            paddingHorizontal:5,
            paddingVertical:2,
            borderRight:0.5,
            backgroundColor:'#DCE9F0'
        },
        tableItems2:{
            paddingHorizontal:5,
            paddingVertical:2,
        },
        tablesItemSub:{paddingHorizontal:2,paddingVertical:5, textAlign:'center',lineHeight:0.9,borderBottom:0.5,backgroundColor:'#EFECE1',fontSize:10},
        tablesItemSubBody:{paddingHorizontal:2,fontSize:8}
    });
    const modulos=[];
    const modNota=[];
    const modEmp=[];
    const modSeg=[];
    const modVer=[];
    const modEnt=[];
    const modPid=[];

   const rol=(array, selectArray, arrayShow)=>{
        for (let key in array){
            if(selectArray.find(ele =>ele.name===array[key].name)){
                arrayShow.push(<Text style={styles.tablesItemSubBody} key={array[key].key}>(X) {array[key].name}</Text>)
            }else{
                arrayShow.push(<Text style={styles.tablesItemSubBody} key={array[key].key}>( ) {array[key].name}</Text>)
            }
        }
   };
    
    const countModulos=()=>{
        if(selectNotarios.length>0){
            modulos.push(<Text key='not0'>(X) Módulo de Notarios</Text>);
            rol(mNotarios,selectNotarios,modNota);
        }else{
            modulos.push(<Text key='not1'>( ) Módulo de Notarios</Text>);
            for (let key in mNotarios){
                modNota.push(<Text style={styles.tablesItemSubBody} key={mNotarios[key].key}>( ) {mNotarios[key].name}</Text>)
            }
        }
        if(selectEmpresas.length>0){
            modulos.push(<Text key='emp0'>(X) Módulo de Empresas</Text>)
            rol(mEmpresas,selectEmpresas,modEmp);
        }else{
            modulos.push(<Text key='emp1'>( ) Módulo de Empresas</Text>)
            for (let key in mEmpresas){
                modEmp.push(<Text style={styles.tablesItemSubBody} key={mEmpresas[key].key}>( ) {mEmpresas[key].name}</Text>)
            }
        }
        if(selectSeguridad.length>0){
            modulos.push(<Text key='seg0'>(X) Módulo de Seguridad</Text>)
            rol(mSeguridad,selectSeguridad,modSeg);
        }else{
            modulos.push(<Text key='seg1'>( ) Módulo de Seguridad</Text>)
            for (let key in mSeguridad){
                modSeg.push(<Text style={styles.tablesItemSubBody} key={mSeguridad[key].key}>( ) {mSeguridad[key].name}</Text>)
            }
        }
        if(selectVerificadores.length>0){
            modulos.push(<Text key='ver0'>(X) Módulo de Verificadores</Text>)
            rol(mVerificadores,selectVerificadores,modVer);
        }else{
            modulos.push(<Text key='ver1'>( ) Módulo de Verificadores</Text>)
            for (let key in mVerificadores){
                modVer.push(<Text style={styles.tablesItemSubBody} key={mVerificadores[key].key}>( ) {mVerificadores[key].name}</Text>)
            }
        }
        if(selectEntidades.length>0){
            modulos.push(<Text key='ent0'>(X) Módulo de Entidades</Text>)
            rol(mEntidades,selectEntidades,modEnt);
        }else{
            modulos.push(<Text key='ent1'>( ) Módulo de Entidades</Text>)
            for (let key in mEntidades){
                modEnt.push(<Text style={styles.tablesItemSubBody} key={mEntidades[key].key}>( ) {mEntidades[key].name}</Text>)
            }
        }
        if(selectPide.length>0){
            modulos.push(<Text key='pid0'>(X) Módulo PIDE</Text>)
            rol(mPide,selectPide,modPid);
        }else{
            modulos.push(<Text key='pid1'>( ) Módulo PIDE</Text>)
            for (let key in mNotarios){
                modPid.push(<Text style={styles.tablesItemSubBody} key={mPide[key].key}>( ) {mPide[key].name}</Text>)
            }
        }
    }
    countModulos();

    const MyDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    <Image style={styles.logo} src={logo} />
                    <Text style={[{ fontSize: 16, textAlign:'center',paddingHorizontal:40,paddingVertical:10,color:'#5494B2'}]}>FORMATO DE SOLICITUD DE ACCESO A LA PLATAFORMA DE SERVICIOS INSTITUCIONALES (PSI)</Text>                      
                </View>
                <Text style={{width:'100%', border:0.8,marginHorizontal:40, borderColor:'#BACFDA'}}></Text>
                <View style={{border:1,marginTop:25, marginHorizontal:40,}}>
                    <Text style={[styles.bold,{borderBottom:0.5, paddingHorizontal:5,paddingVertical:2,backgroundColor:'#BBD6E3'}]}>DATOS DEL USUARIO</Text>
                    <View style={[styles.container,{borderBottom:0.5,borderTop:0.5,}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Apellido paterno</Text>
                        <Text style={[styles.item70,styles.tableItems2]}>{apePaterno}</Text>
                    </View>
                    <View style={[styles.container,{borderBottom:0.5,borderTop:0.5,}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Apellido materno</Text>
                        <Text style={[styles.item70,styles.tableItems2]}>{apeMaterno}</Text>
                    </View>
                    <View style={[styles.container,{borderBottom:0.5}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Nombres</Text>
                        <Text style={[styles.item70,styles.tableItems2]}>{nombre}</Text>
                    </View>
                    <View style={[styles.container,{borderBottom:0.5,borderTop:0.5}]}>
                        <Text style={[styles.item30, styles.tableItems]}>DNI</Text>
                        <Text style={[styles.item70,styles.tableItems2]}>{dni}</Text>
                    </View>
                    <View style={[styles.container,{borderBottom:0.5,borderTop:0.5,}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Correo electrónico</Text>
                        <Text style={[styles.item70,styles.tableItems2]}>{correo}</Text>
                    </View>
                    <View style={[styles.container,{borderTop:0.5,}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Cargo</Text>
                        <Text style={[styles.item70,styles.tableItems2]}>{cargo}</Text>
                    </View>
                </View>
                <View style={{border:1,marginTop:20, marginHorizontal:40,}}>
                    <Text style={[styles.bold,{borderBottom:0.5, paddingHorizontal:5,paddingVertical:2,backgroundColor:'#BBD6E3'}]}>DATOS DE LA UNIDAD ORGANIZACIONAL</Text>
                    <View style={[styles.container,{borderBottom:0.5}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Unidad Organizacional</Text>
                        <Text style={[styles.item70,styles.tableItems2]}>{unidad}</Text>
                    </View>
                    <View style={[styles.container,{borderBottom:0.5}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Zona Registral</Text>
                        <Text style={[styles.item70,styles.tableItems2]}>Zona X</Text>
                    </View>
                    <View style={[styles.container,{borderBottom:0.5}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Oficina Registral</Text>
                        <Text style={[styles.item70,styles.tableItems2]}>{oficina}</Text>
                    </View>
                    <View style={[styles.container,{borderBottom:0.5,borderTop:0.5,}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Zonal / Receptora</Text>
                        <Text style={[styles.item70,styles.tableItems2]}>-</Text>
                    </View>
                    <View style={[styles.container,{borderTop:0.5,}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Anexo</Text>
                        <Text style={[styles.item70,styles.tableItems2]}>-</Text>
                    </View>
                </View>
                <View style={{border:0.5,marginTop:20, marginHorizontal:40,}}>
                    <Text style={[styles.bold,{borderBottom:0.5,borderRight:0.5,borderLeft:0.5, paddingHorizontal:5,paddingVertical:2,backgroundColor:'#BBD6E3'}]}>DATOS DEL ACCESO</Text>
                    <View style={[styles.container,{borderBottom:0.5,borderLeft:0.5}]}>
                        <Text style={[{width:'15%',textAlign:'center', padding:8}, styles.tableItems]}>Indicar los módulos a la cual se le brindará acceso</Text>
                        <View style={{width:'85%', padding:5,borderRight:0.5}}>
                            {modulos}
                        </View>
                    </View>
                    <View style={[styles.container,{borderBottom:0.5,borderLeft:0.5}]}>
                        <Text style={[{width:'15%',textAlign:'center', padding:8,marginTop:0.5,borderTop:0.5}, styles.tableItems]}>Indicar ROL del acceso</Text>
                        <View style={[{width:'85%'},styles.container]}>
                            <View style={{width:'16%',borderRight:0.5}}>
                                <Text style={styles.tablesItemSub}>Módulo de Notarios</Text>
                                <View >{modNota}</View>
                            </View>
                            <View style={{width:'17%',borderRight:0.5,}}>
                                <Text style={styles.tablesItemSub}>Módulo de Empresas</Text>
                                <View>{modEmp}</View>
                            </View>
                            <View style={{width:'17%',borderRight:0.5,}}>
                                <Text style={styles.tablesItemSub}>Módulo de Seguridad</Text>
                                <View>{modSeg}</View>
                            </View>
                            <View style={{width:'18%',borderRight:0.5,}}>
                                <Text style={styles.tablesItemSub}>Módulo de Verificadores</Text>
                                <View>{modVer}</View>
                            </View>
                            <View style={{width:'17%',borderRight:0.5,}}>
                                <Text style={styles.tablesItemSub}>Módulo de Entidades</Text>
                                <View>{modEnt}</View>
                            </View>
                            <View style={{width:'15%',borderRight:0.5,}}>
                                <Text style={styles.tablesItemSub}>Módulo PIDE</Text>
                                <View>{modPid}</View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{marginTop:20, marginHorizontal:40,}}>
                    <Text>Autorizado por: {autorizadoPor}</Text>
                    <View style={[{width: '25%',borderTop:1, borderStyle: 'dotted',marginTop:50}]}>
                        <Text style={[{fontSize:9,paddingTop:5},styles.marginAuto]}>Firma y Sello</Text>
                    </View>
                </View>
                <Image style={{width:'100%', marginTop:10}} src={footer} />
            </Page>
        </Document>

    );
    return (
        MyDocument
    )
}

export default PsiReport