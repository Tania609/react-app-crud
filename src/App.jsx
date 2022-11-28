//import "primereact/resources/themes/mdc-light-indigo/theme.css"; //100 puntos
//import "primereact/resources/themes/rhea/theme.css"; //100 puntos
//import "primereact/resources/themes/saga-blue/theme.css"; //99 puntos
//import "primereact/resources/themes/fluent-light/theme.css";//98 puntos
//import "primereact/resources/themes/tailwind-light/theme.css";//80 puntos
//import "primereact/resources/themes/lara-light-indigo/theme.css";//20 puntos
//==============================DARK===============================================
//import "primereact/resources/themes/luna-blue/theme.css"; //100 puntos
//import "primereact/resources/themes/bootstrap4-dark-blue/theme.css"
//import "primereact/resources/themes/bootstrap4-dark-purple/theme.css"
//import "primereact/resources/themes/md-dark-indigo/theme.css"
//import "primereact/resources/themes/md-dark-deeppurple/theme.css"
//import "primereact/resources/themes/lara-dark-blue/theme.css";
//import "primereact/resources/themes/lara-dark-indigo/theme.css"
//import "primereact/resources/themes/lara-dark-purple/theme.css"
//import "primereact/resources/themes/lara-dark-teal/theme.css"
//import "primereact/resources/themes/mdc-dark-indigo/theme.css"
//import "primereact/resources/themes/mdc-dark-deeppurple/theme.css"
//==============================FIN DARK===============================================

//import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
//import "primereact/resources/themes/bootstrap4-light-purple/theme.css"
//import "primereact/resources/themes/md-light-indigo/theme.css"
//import "primereact/resources/themes/md-light-deeppurple/theme.css"
//import "primereact/resources/themes/mdc-light-indigo/theme.css"
//import "primereact/resources/themes/mdc-light-deeppurple/theme.css"

import "primereact/resources/themes/tailwind-light/theme.css"
//import "primereact/resources/themes/fluent-light/theme.css"
//import "primereact/resources/themes/lara-light-blue/theme.css"
//import "primereact/resources/themes/lara-light-indigo/theme.css"
//import "primereact/resources/themes/lara-light-purple/theme.css"
//import "primereact/resources/themes/lara-light-teal/theme.css"
//import "primereact/resources/themes/saga-green/theme.css"
//import "primereact/resources/themes/saga-orange/theme.css"
//import "primereact/resources/themes/saga-purple/theme.css"
//import "primereact/resources/themes/vela-blue/theme.css"
//import "primereact/resources/themes/vela-green/theme.css"
//import "primereact/resources/themes/vela-orange/theme.css"
//import "primereact/resources/themes/vela-purple/theme.css"
//import "primereact/resources/themes/arya-blue/theme.css"
//import "primereact/resources/themes/arya-green/theme.css"
//import "primereact/resources/themes/arya-orange/theme.css"
//import "primereact/resources/themes/arya-purple/theme.css";
//import "primereact/resources/themes/nova/theme.css"
//import "primereact/resources/themes/nova-alt/theme.css"
//import "primereact/resources/themes/nova-accent/theme.css"
//import "primereact/resources/themes/luna-amber/theme.css"
//import "primereact/resources/themes/luna-green/theme.css"
//import "primereact/resources/themes/luna-pink/theme.css";

import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import "./App.css";
import TableVpn from "./component/TableVpn";
import Email from './component/Email'
import { TabView, TabPanel } from 'primereact/tabview';
import {Routes, Route} from 'react-router-dom';
import FsaV2 from './pages/FsaV2';
import Dropwdown2 from './reports/PsiReport';
const App = () => {
    const tab =()=>{
        return(
            <div className="tabview-demo">
                <div className="card">
                    <h1>UTI - DATABASE</h1>
                    <TabView className="tabview-header-icon">
                        <TabPanel header="EMPLEADOS" rightIcon="pi pi-calendar">
                            
                        </TabPanel>
                        <TabPanel header="VPN" rightIcon="pi pi-user">
                            <div>
                                <TableVpn></TableVpn>
                            </div>                     
                        </TabPanel>
                        <TabPanel header="EMAIL" rightIcon="pi pi-cog">
                            <div>
                                <Email></Email>
                            </div>
    
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        )
    }
  return (
    <div className="App">
        <Routes>
            {//<Route path="/" element={tab()}></Route>
            }
            <Route path="fsa" element={<FsaV2/>}></Route>
            <Route path="pdf" element={<Dropwdown2/>}></Route>
        </Routes>
       
    
      
    </div>
  );
};

export default App;