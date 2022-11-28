import React from 'react'
import logo from '../images/logo.png'
import { Document, Page, Text, View, StyleSheet ,PDFViewer,Image,PDFDownloadLink,Font} from '@react-pdf/renderer';

const PsiReport = ({dni,nombre,apePaterno,apeMaterno,correo,cargo,unidad,oficina,
    selectNotarios,selectEmpresas,selectSeguridad,selectVerificadores,selectEntidades,selectPide}) => {

    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            fontSize: 11,
            paddingTop: 30,
            paddingLeft:50,
            paddingRight:50,
            lineHeight: 1.5,
            flexDirection: 'column',
        }, 
        logo: {
            width: 130,
            height: 70,
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
        }
    });

    const MyDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    <Image style={styles.logo} src={logo} />
                    <Text style={[{ fontSize: 16, marginTop:20, textAlign:'center',padding:10,color:'#5494B2'}]}>FORMATO DE SOLICITUD DE ACCESO A LA PLATAFORMA DE SERVICIOS INSTITUCIONALES (PSI)</Text>             
                    <Text style={{width:'100%', border:0.8, borderColor:'#BACFDA'}}></Text>
                </View>
                <View style={{border:0.5,marginTop:40, marginHorizontal:40,}}>
                    <Text style={[styles.bold,{borderBottom:0.5, padding:5,backgroundColor:'#BBD6E3'}]}>DATOS DEL USUARIO</Text>
                    <View style={[styles.container,{borderBottom:0.5}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Apellido paterno</Text>
                        <Text style={styles.item70}>{apePaterno}</Text>
                    </View>
                    <View style={[styles.container,{borderBottom:0.5}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Apellido materno</Text>
                        <Text style={styles.item70}>{apePaterno}</Text>
                    </View>
                    <View style={[styles.container,{borderBottom:0.5}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Nombres</Text>
                        <Text style={styles.item70}>{apePaterno}</Text>
                    </View>
                    <View style={[styles.container,{borderBottom:0.5}]}>
                        <Text style={[styles.item30, styles.tableItems]}>DNI</Text>
                        <Text style={styles.item70}>{apePaterno}</Text>
                    </View>
                    <View style={[styles.container,{borderBottom:0.5}]}>
                        <Text style={[styles.item30, styles.tableItems]}>Correo electrónico</Text>
                        <Text style={styles.item70}>{apePaterno}</Text>
                    </View>
                    <View style={[styles.container,]}>
                        <Text style={[styles.item30, styles.tableItems]}>Cargo</Text>
                        <Text style={styles.item70}>{apePaterno}</Text>
                    </View>
                </View>
            </Page>
        </Document>

    );
    return (
        <PDFViewer width="1000" height="600" className="app" >
                {MyDocument}
        </PDFViewer>
    )
}

export default PsiReport