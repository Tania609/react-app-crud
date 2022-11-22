import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable';

const DataTableComponet = ({entidades,columnasTabla,dataKey}) => {
    const [filters1, setFilters1] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }, //filtro Global
      desc_estd: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      desc_ofic: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      
    });

    //INICIO BUSCADOR Global
      const filtersMap = {
        filters1: { value: filters1, callback: setFilters1 },
    };

    const onGlobalFilterChange1 = (event, filtersKey) => {
        const value = event.target.value;
        let filters = { ...filtersMap[filtersKey].value };
        filters["global"].value = value;
        filtersMap[filtersKey].callback(filters);
    };

    //Uncion para limpiar los filtros
    const clearFilter1 = () => {
        setFilters1( {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS }, //filtro Global
            desc_estd: {
              operator: FilterOperator.OR,
              constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
            desc_ofic: {
              operator: FilterOperator.OR,
              constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
          }); //Agregamos el valor VACIO a la variable SetFilter para vaciar el filtro
    };
    
    const renderBuscador=(filtersKey)=>{
        const filters = filtersMap[`${filtersKey}`].value;
        const value = filters["global"] ? filters["global"].value : "";
        return(
            <div className="table-header">
                <div className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        value={value || ""}
                        onChange={(e) => onGlobalFilterChange1(e, filtersKey)}
                        placeholder="Global Search"
                    />
                </div>
                <Button //Boton para limpiar la busqueda del textbox global
                    type="button"
                    icon="pi pi-filter-slash"
                    label="Limpiar"
                    className="p-button-outlined"
                    onClick={clearFilter1}
                />
            </div>
        );
    };

    const header1 =renderBuscador("filters1");
    
    return (
      <div>
        <DataTable 
              value={entidades} 
              rows={20}
              responsiveLayout="scroll"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              dataKey={'"'+dataKey+'"'}
              paginator
              showGridlines //Si se van a mostrar líneas de cuadrícula entre celdas.
              emptyMessage="No se encontraron resultados"
              className="datatable-responsive"
              currentPageReportTemplate="Mostrando {first} de {last} de un total de {totalRecords} registros"
              size="small" 
              header={header1}  
              filterDisplay="menu"
              filters={filters1}
              onFilter={(e) => setFilters1(e.filters)}
          >
            {columnasTabla}
        </DataTable> 
      </div>
    )
}

export default DataTableComponet