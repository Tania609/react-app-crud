import React from 'react'
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import Entidades from "../services/Entidades";

const FiltrosEntidad = () => {
    const [empleados,empleadosCombo,oficinas,oficinasCombo,perfiles,perfilCombo,estados,estadosCombo,areas,areasCombo]=Entidades();

    const estadoItemTemplate = (option) => {
        return <span className={`empleado-badge estado-${option}`}>{option}</span>;
    };
    const estadoFilterTemplate = (options) => {
        return (
          <Dropdown
            value={options.value}
            options={estados}
            onChange={(e) => options.filterCallback(e.value, options.index)}
            itemTemplate={estadoItemTemplate}
            placeholder="Estado"
            className="p-column-filter"
            showClear
          />
        );
    };
    const oficinaItemTemplate = (option) => {
        return <span className="image-text">{option}</span>;
    };

    const oficinaFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value}
                options={oficinas}
                onChange={(e) => options.filterCallback(e.value)}
                itemTemplate={oficinaItemTemplate}
                placeholder="Oficina"
                className="p-column-filter"
                showClear
            />
        );
    };
    const areaItemTemplate = (option) => {
        return <span >{option}</span>;
    };
    const areaFilterTemplate = (options) => {
    //console.table(options.value);
        return (
            <MultiSelect
            value={options.value}
            options={areas}
            onChange={(e) => options.filterCallback(e.value)}
            itemTemplate={areaItemTemplate}
            placeholder="Area"
            className="p-column-filter"
            showClear
            />
        );
    };

    return[
        estadoFilterTemplate,oficinaFilterTemplate,areaFilterTemplate
    ]

}

export default FiltrosEntidad