import { Document, Page, Text, View, StyleSheet ,PDFViewer,Image,PDFDownloadLink} from '@react-pdf/renderer';
import logo from '../images/logo.png'
import React from 'react'
import { renderMatches } from 'react-router-dom';

const FsaV2Report = ({dni,nombre,apePaterno,apeMaterno,correo,oficina,unidad,area,cargo,dirIp,sustento,
    selectSistemas,autorizadoPor}) => {
     
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
            fontStyle:'bold'
        },
        marginAuto:{
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        bold: {'fontWeight': 'bolder'},
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
            padding:'7px',
            borderColor:'#d4d4d8'
        },
        containerSub:{
            marginLeft:4,
            marginTop:7,
        }
    });
    const sistemas = [];
    for (let i in selectSistemas) {
        sistemas.push(
        <View style={styles.container}>
            <View style={styles.item30}>
                <Text  style={{ fontSize: 9,}} >{parseInt(i)+1}</Text>
            </View>
            <View style={styles.item70}>
                <Text  style={{ fontSize: 9,}} >{selectSistemas[i].name}</Text>
            </View>
        </View>
      );
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
                            <Text style={[styles.marginAuto,styles.bold,styles.underline,{ fontSize: 12, paddingTop:5}]}>FORMATO DE SOLICITUD DE ALTA DE ACCESOS</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.containerBody}>
                    <Text  style={{ fontSize: 10,marginBottom:4}} >1. DATOS DE LA SOLICITUD</Text>
                        <View style={[styles.container,styles.containerSub]}>
                            <View style={styles.item30}>
                                <View style={[styles.container,{ padding: 1}]}>
                                    <View style={styles.item30}><Text  style={{ fontSize: 9,}} >Nombres</Text></View>
                                    <View style={styles.item70}><Text  style={{ fontSize: 9,textTransform:'uppercase'}} >: {nombre} </Text></View>
                                </View>
                            </View>
                            <View style={styles.item30}>
                                <View style={[styles.container,{ padding: 1}]}>
                                    <View style={styles.item30}><Text  style={{ fontSize: 9,}} >Apellidos</Text></View>
                                    <View style={styles.item70}><Text  style={{ fontSize: 9,textTransform:'uppercase'}} >: {apePaterno+" "+apeMaterno} </Text></View>
                                </View>
                            </View>
                            <View style={styles.item30}>
                                <View style={[styles.container,{ padding: 1}]}>
                                    <View style={styles.item30}><Text  style={{ fontSize: 9}} >DNI</Text></View>
                                    <View style={styles.item70}><Text  style={{ fontSize: 10}} >: {dni} </Text></View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.container,styles.containerSub]}>
                            <View style={styles.item30}>
                                <View style={[styles.container,{ padding: 1}]}>
                                    <View style={styles.item30}><Text  style={{ fontSize: 9,}} >Oficina</Text></View>
                                    <View style={styles.item70}><Text  style={{ fontSize: 10}} >: {oficina} </Text></View>
                                </View>
                            </View>
                            <View style={styles.item30}>
                                <View style={[styles.container,{ padding: 1}]}>
                                    <View style={styles.item30}><Text  style={{ fontSize: 9,}} >Unidad</Text></View>
                                    <View style={styles.item70}><Text  style={{ fontSize: 10}} >: {unidad}</Text></View>
                                </View>
                            </View>
                            <View style={styles.item30}>
                                <View style={[styles.container,{ padding: 1}]}>
                                    <View style={styles.item30}><Text  style={{ fontSize: 9}} >Area</Text></View>
                                    <View style={styles.item70}><Text  style={{ fontSize: 10}} >: {area} </Text></View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.container,styles.containerSub]}>
                            <View style={styles.item30}>
                                <View style={[styles.container,{ padding: 1}]}>
                                    <View style={styles.item30}><Text  style={{ fontSize: 9,}} >Cargo</Text></View>
                                    <View style={styles.item70}><Text  style={{ fontSize: 10}} >: {cargo}</Text></View>
                                </View>
                            </View>
                            <View style={styles.item30}>
                                <View style={[styles.container,{ padding: 1}]}>
                                    <View style={styles.item30}><Text  style={{ fontSize: 9,}} >Ip</Text></View>
                                    <View style={styles.item70}><Text  style={{ fontSize: 10}} >: {dirIp}</Text></View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.containerSub]}>
                            <Text  style={{ fontSize: 10,paddingTop:4}} >Mediante el presente, se solicita los acesos a los siguientes sistemas para realizar mis labores</Text>
                            <View style={[styles.container,styles.containerSub]}>
                                <View style={styles.item50}>
                                    <View style={styles.container}>
                                        <View style={[{border:1,width:'20%',paddingTop:3,paddingBottom:3},]}>
                                            <Text  style={[{ fontSize: 9,},styles.marginAuto]} >Nro</Text>
                                        </View>
                                        <View style={[styles.item70,{border:1,paddingTop:3,paddingBottom:3}]}>
                                            <Text  style={{ fontSize: 9,}} >SISTEMA</Text>
                                        </View> 
                                    </View>
                                    {sistemas}
                                </View>
                            </View>
                            <View style={[styles.container,{marginTop:10}]}>
                                <View style={{width: '10%',}}>
                                    <Text  style={{ fontSize: 10,paddingTop:4}} >Sustento</Text>
                                </View>
                                <View style={styles.item70}>
                                    <Text  style={{ fontSize: 10,paddingTop:4}} >: {sustento}</Text>
                                </View>
                                </View>
                        </View>
                </View>
                <View style={styles.containerBody}>
                    <Text  style={{ fontSize: 10,marginBottom:4}} >2. AUTORIZACION</Text>
                        <View style={[styles.container,styles.containerSub]}>
                            <View style={styles.item30}>
                                <View style={[styles.container,{ padding: 1}]}>
                                    <View style={styles.item30}><Text  style={{ fontSize: 9,}} >Nombres</Text></View>
                                    <View style={styles.item70}><Text  style={{ fontSize: 9,textTransform:'uppercase'}} >: {nombre} </Text></View>
                                </View>
                            </View>
                        </View>
                </View>
            </Page>
        </Document>
    );

    return (
    /*
    <PDFDownloadLink document={MyDocument} fileName="FSA.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
    )*/
    <PDFViewer width="1000" height="600" className="app" >
                {MyDocument}
            </PDFViewer>
    )
}

export default FsaV2Report



