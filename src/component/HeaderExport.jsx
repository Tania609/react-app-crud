import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";

const HeaderExport = ({cols, entidad, text}) => {
    const exportColumns = cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));
    const saveAsExcelFile = (buffer, fileName) => {
        import("file-saver").then((FileSaver) => {
          let EXCEL_TYPE =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          let EXCEL_EXTENSION = ".xlsx";
          const data = new Blob([buffer], {
            type: EXCEL_TYPE,
          });
          FileSaver.saveAs(
            data,
            fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
          );
        });
    };
    
    //Exportar a Excel
    const exportExcel = () => {
        import("xlsx").then((xlsx) => {
          const workSheet = xlsx.utils.json_to_sheet(entidad);
          const workBook = { Sheets: { data: workSheet }, SheetNames: ["data"] };
          const excelBuffer = xlsx.write(workBook, {
            bookType: "xlsx",
            type: "array",
          });
          saveAsExcelFile(excelBuffer, '"'+text+'"');
        });
    };
    
    //Exportar a PDF
    const exportPDF = () => {
        import("jspdf").then((jsPDF) => {
          import("jspdf-autotable").then(() => {
            const doc = new jsPDF.default(0, 0);
            doc.autoTable(exportColumns, entidad);
            doc.save('"'+text+'ZRX.pdf');
          });
        });
    };
    return (
      <div className="flex align-items-center export-button">
        <Button
          type="button"
          icon="pi pi-file-excel"
          onClick={exportExcel}
          className="p-button-success"
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          onClick={exportPDF}
          className="p-button-warning"
          data-pr-tooltip="PDF"
        />
      </div>
    )
}

export default HeaderExport