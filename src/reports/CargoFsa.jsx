import { Document, Page, Text, View, StyleSheet ,PDFViewer,Image,PDFDownloadLink,Font} from '@react-pdf/renderer';
import logo from '../images/logo.png'
import React from 'react'

const CargoFsa = ({nombre,dni,fecha,datosCargo}) => {
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
            fontSize:9
        },
    });

    const sistemas = [];
    for (let i in datosCargo) {
        sistemas.push(
            <View style={styles.container} key={datosCargo[i][0]}>
                <View style={[{width:'10%',paddingTop:8,paddingBottom:3,borderRight:0.8,borderLeft:0.8,borderBottom:1}]}>
                    <Text  style={[styles.textItems,styles.marginAuto]} >{parseInt(i)+1}</Text>
                </View>
                <View style={[{width:'35%',paddingTop:8,paddingBottom:3,borderRight:0.8,borderBottom:1}]}>
                    <Text  style={[styles.textItems,styles.marginAuto]} >{datosCargo[i][0]}</Text>
                </View>
                <View style={[{width:'20%',paddingTop:8,paddingBottom:3,borderRight:0.8,borderBottom:1}]}>
                    <Text  style={[styles.textItems,styles.marginAuto]} >{datosCargo[i][1]}</Text>
                </View>
                <View style={[{width:'35%',paddingTop:8,paddingBottom:3,borderRight:0.8,borderBottom:1}]}>
                    <Text  style={[styles.textItems,styles.marginAuto]} >{datosCargo[i][2]}</Text>
                </View>
            </View>
      );
    }
    

    /*
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
    */ 
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
                            <Text style={[styles.marginAuto,styles.bold,{ fontSize: 13, paddingTop:5,}]}>CARGO DE ENTREGA DE ACCESOS</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.containerBody}>
                    <View style={styles.container}>
                        <Text  style={[{ fontSize: 11,marginBottom:4},styles.item50,styles.bold,styles.underline]} >1.DATOS DE ACCESOS</Text>
                        <View style={[styles.item50,{fontSize: 10,flexDirection:'row-reverse',paddingRight:10,marginBottom:4}]}>
                            <Text> {fecha}</Text>
                            <Text  style={[styles.bold]} >Fecha:</Text>
                        </View>
                    </View>
                    <View style={[styles.container,{ padding: 5}]}>
                        <Text>Por la presente, la Unidad de Tecnologias de la Informacion hace entrega al personal,
                            <Text  style={[styles.bold]} > {nombre}</Text>, identificado con N° de DNI<Text  style={[styles.bold]} > {dni}</Text>,
                            la(s) clave(s) de acceso siguientes:
                        </Text>
                    </View>
                    <View style={[styles.container,styles.containerSub,{ margin: 5}]}>
                        <View style={styles.container}>
                            <View style={[{width:'10%',paddingTop:8,paddingBottom:3,borderRight:1,borderLeft:0.8,borderTop:1,borderBottom:0.8}]}>
                                <Text  style={[styles.textItems,styles.marginAuto]} >NRO</Text>
                            </View>
                            <View style={[{width:'35%',paddingTop:8,paddingBottom:3,borderRight:0.8,borderTop:1,borderBottom:0.8}]}>
                                <Text  style={[styles.textItems,styles.marginAuto]} >SISTEMA</Text>
                            </View>
                            <View style={[{width:'20%',paddingTop:8,paddingBottom:3,borderRight:0.8,borderTop:1,borderBottom:0.8}]}>
                                <Text  style={[styles.textItems,styles.marginAuto]} >USUARIO</Text>
                            </View>
                            <View style={[{width:'35%',paddingTop:8,paddingBottom:3,borderRight:0.8,borderTop:1,borderBottom:0.8}]}>
                                <Text  style={[styles.textItems,styles.marginAuto]} >CONSTRASEÑA</Text>
                            </View>
                        </View>
                        {sistemas}
                    </View>
                </View>
                <View style={styles.containerBody}>
                    <View style={styles.container}>
                        <Text  style={[{ fontSize: 11,marginBottom:4},styles.item50,styles.bold,styles.underline]} >2. RECEPCIÓN</Text>
                        <View style={[styles.item50,{fontSize: 10,flexDirection:'row-reverse',paddingRight:10,marginBottom:4}]}>
                            <Text> {fecha}</Text>
                            <Text  style={[styles.bold]} >Fecha:</Text>
                        </View>
                    </View>
                    
                    <View style={{alignItems: 'center',paddingTop:50}}>
                        <View style={[{width: '25%',borderTop:1, alignContent:'left'}]}>
                            <Text style={[{fontSize:9,paddingTop:5},styles.marginAuto]}>Firma</Text>
                            <Text style={[{fontSize:9,paddingTop:5},styles.marginAuto]}>DNI : {dni}</Text>
                        </View>
                    </View>
                    <View style={[styles.container,{padding:10,marginTop:30}]}>
                        <Text  style={[styles.bold,{fontSize:8,}]} >IMPORTANTE</Text>
                        <Text  style={{fontSize:9,paddingTop:5}} >- La clave entregada es de caracter temporal ya que el usuario se compromete bajo responsabilidad a cambiarla de forma inmediata, quedando a su responsabilidad las futuras modificaciones a las mismas.</Text>
                        <Text  style={{fontSize:9,paddingTop:3}} >- El usuario se compromete a hacer un uso diligente de las claves de acceso, y a no ponerlas a disposicion deterceros.</Text>
                        <Text  style={{fontSize:9,paddingTop:3}} >- El uso de la(s) clave(s) proporcionadas son de plena responsabilidad del titular, asi como el uso indebido que terceras personas pudieran hacer del mismo, quedando la SUNARP liberada de toda responsabilidad.</Text>
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

export default CargoFsa