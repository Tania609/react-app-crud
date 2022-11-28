import { Document, Page, Text, View, StyleSheet ,PDFViewer,Image,PDFDownloadLink,Font} from '@react-pdf/renderer';
import logo from '../images/logo.png'
import React from 'react'

const FsaV2Report = ({dni,nombre,apePaterno,apeMaterno,correo,oficina,unidad,area,cargo,dirIp,sustento,
    selectSistemas,autorizadoPor,autorizado}) => {

    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            fontSize: 11,
            paddingTop: 30,
            paddingLeft:30,
            paddingRight:30,
            lineHeight: 1.5,
            flexDirection: 'column',
        }, 
        logo: {
            width: 160,
            height: 80,
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
    });
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    const sistemas = [];
    for (let i in selectSistemas) {
        sistemas.push(
            <View style={styles.container} key={selectSistemas[i].key}>
                <View style={[{borderRight:1,borderBottom:1,borderLeft:1,width:'20%',paddingTop:8,paddingBottom:3},]}>
                    <Text  style={[{ fontSize: 9,},styles.marginAuto]} >{parseInt(i)+1}</Text>
                </View>
                <View style={[styles.item70,{borderRight:1,borderBottom:1,paddingTop:8,paddingBottom:3}]}>
                    <Text  style={{ fontSize: 9,paddingLeft:5}} >{selectSistemas[i].name}</Text>
                </View> 
            </View>
      );
    }
    const viewAutorizado=()=>{
        if(autorizado==='Jefe'){
            return(
                <View style={[styles.container,styles.containerSub]}>
                    <View style={[styles.container,{ padding: 1},styles.marginYauto]}>
                        <View style={styles.item30}><Text  style={styles.textItems} >Jefe de Unidad / Jefe inmediato</Text></View>
                        <View style={styles.item70}><Text  style={{ fontSize: 9}} >: {autorizadoPor} </Text></View>
                    </View> 
                </View>
            )
        }else{
            return(
                <View style={[styles.container,styles.containerSub]}>
                    <View style={[styles.container,{ padding: 1},styles.marginYauto]}>
                        <View style={styles.item30}><Text  style={styles.textItems} >Documento que sustenta</Text></View>
                        <View style={styles.item70}><Text  style={{ fontSize: 9}} >: {autorizadoPor} </Text></View>
                    </View>
                </View>
            )
        }
    }   
    const MyDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    <View style={styles.item30}>
                        <Image style={styles.logo} src={logo} />
                    </View>
                    <View style={styles.item70}>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.marginAuto,{ fontSize: 10}]}>ZONA REGISTRAL N°X - SEDE CUSCO</Text>
                            <Text style={[styles.marginAuto,{ fontSize: 10,}]}>UNIDAD DE TECNOLOGÍA DE LA INFORMACIÓN</Text>
                            <Text style={[styles.marginAuto,styles.bold,{ fontSize: 13, paddingTop:5,}]}>FORMATO DE SOLICITUD DE ALTA DE ACCESOS</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.containerBody}>
                    <View style={styles.container}>
                        <Text  style={[{ fontSize: 11,marginBottom:4},styles.item50,styles.bold,styles.underline]} >1. DATOS DE LA SOLICITUD</Text>
                        <View style={[styles.item50,{fontSize: 10,flexDirection:'row-reverse',paddingRight:10,marginBottom:4}]}>
                            <Text> {`${day}/${month}/${year}`}</Text>
                            <Text  style={[styles.bold]} >Fecha:</Text>
                        </View>
                    </View>
                    <View style={[styles.container,styles.containerSub]}>
                        <View style={styles.item30}>
                            <View style={[styles.container,{ padding: 1},styles.marginYauto]}>
                                <View style={styles.item30}><Text  style={styles.textItems}>DNI</Text></View>
                                <View style={styles.item70}><Text  style={{ fontSize: 10}} >: {dni} </Text></View>
                            </View>
                        </View>
                        <View style={styles.item30}>
                            <View style={[styles.container,{ padding: 1},styles.marginYauto]}>
                                <View style={styles.item30}><Text  style={styles.textItems} >Nombres</Text></View>
                                <View style={styles.item70}><Text  style={{ fontSize: 9,textTransform:'uppercase'}} >: {nombre} </Text></View>
                            </View>
                        </View>
                        <View style={styles.item30}>
                            <View style={[styles.container,{ padding: 1},styles.marginYauto]}>
                                <View style={styles.item30}><Text  style={styles.textItems}>Apellidos</Text></View>
                                <View style={styles.item70}><Text  style={{ fontSize: 9,textTransform:'uppercase'}} >: {apePaterno+" "+apeMaterno} </Text></View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.container,styles.containerSub]}>
                        <View style={styles.item30}>
                            <View style={[styles.container,{ padding: 1},styles.marginYauto]}>
                                <View style={styles.item30}><Text  style={styles.textItems}>Oficina</Text></View>
                                <View style={styles.item70}><Text  style={{ fontSize: 9,textTransform:'uppercase'}} >: {oficina} </Text></View>
                            </View>
                        </View>
                        <View style={styles.item30}>
                            <View style={[styles.container,{ padding: 1},styles.marginYauto]}>
                                <View style={styles.item30}><Text  style={styles.textItems}>Unidad</Text></View>
                                <View style={styles.item70}><Text  style={{ fontSize: 9,textTransform:'uppercase'}} >: {unidad}</Text></View>
                            </View>
                        </View>
                        <View style={styles.item30}>
                            <View style={[styles.container,{ padding: 1},styles.marginYauto]}>
                                <View style={styles.item30}><Text style={styles.textItems}>Area</Text></View>
                                <View style={styles.item70}><Text style={{ fontSize: 9,textTransform:'uppercase'}} >: {area} </Text></View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.container,styles.containerSub]}>
                        <View style={styles.item30}>
                            <View style={[styles.container,{ padding: 1},styles.marginYauto]}>
                                <View style={styles.item30}><Text  style={styles.textItems}>Cargo</Text></View>
                                <View style={styles.item70}><Text  style={{ fontSize: 9,textTransform:'uppercase'}} >: {cargo}</Text></View>
                            </View>
                        </View>
                        <View style={styles.item30}>
                            <View style={[styles.container,{ padding: 1},styles.marginYauto]}>
                                <View style={styles.item30}><Text  style={styles.textItems}>IP</Text></View>
                                <View style={styles.item70}><Text  style={{ fontSize: 9,textTransform:'uppercase'}}>: {dirIp}</Text></View>
                            </View>
                        </View>
                        <View style={styles.item30}>
                            <View style={[styles.container,{ padding: 1},styles.marginYauto]}>
                                <View style={styles.item30}><Text  style={styles.textItems}>Correo</Text></View>
                                <View style={styles.item70}><Text  style={{ fontSize: 9,}}>: {correo}</Text></View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.containerSub]}>
                        <Text  style={{ fontSize: 11,paddingTop:10}} >Mediante el presente, se solicita los acesos a los siguientes sistemas para realizar mis labores</Text>
                        <View style={[styles.container,styles.containerSub]}>
                            <View style={styles.item50}>
                                <View style={styles.container}>
                                    <View style={[{border:1,width:'20%',paddingTop:8,paddingBottom:3},]}>
                                        <Text  style={[styles.textItems,styles.marginAuto]} >Nro</Text>
                                    </View>
                                    <View style={[styles.item70,{borderRight:1,borderBottom:1,borderTop:1,paddingTop:8,paddingBottom:3}]}>
                                        <Text  style={[{paddingLeft:5},styles.textItems]} >SISTEMA</Text>
                                    </View> 
                                </View>
                                {sistemas}
                            </View>
                        </View>
                        <View style={[styles.container,{marginTop:20}]}>
                            <View style={{width: '10%',}}>
                                <Text  style={styles.textItems} >Sustento</Text>
                            </View>
                            <View style={styles.item70}>
                                <Text  style={[{ fontSize: 10},styles.underline]} >: {sustento}</Text>
                            </View>
                            </View>
                    </View>
                </View>
                <View style={styles.containerBody}>
                    <View style={styles.container}>
                        <Text  style={[{ fontSize: 11,marginBottom:4},styles.item50,styles.bold,styles.underline]} >2. AUTORIZACION</Text>
                        <View style={[styles.item50,{fontSize: 10,flexDirection:'row-reverse',paddingRight:10,marginBottom:4}]}>
                            <Text> {`${day}/${month}/${year}`}</Text>
                            <Text  style={[styles.bold]} >Fecha:</Text>
                        </View>
                    </View>
                    {viewAutorizado()}
                    <View style={{alignItems: 'center',paddingTop:50}}>
                    <View style={[{width: '25%',borderTop:1, alignContent:'left'}]}>
                        <Text style={[{fontSize:9,paddingTop:5},styles.marginAuto]}>Firma</Text>
                    </View>
                    </View>
                </View>
            </Page>
        </Document>
    );

    return (
        MyDocument
    )
    /*<PDFViewer width="1000" height="600" className="app" >
                {MyDocument}
            </PDFViewer>
    )*/
}

export default FsaV2Report



