import {forwardRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportPdf = forwardRef(({data, titlePdf = 'no_name', columns}, ref) => {
  useImperativeHandle(ref, () => ({
    exportPDF() {
      exportPDFIn();
    },
  }));

  const exportPDFIn = () => {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'landscape'; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = titlePdf;

    let header = [];
    let body2 = [];

    for (let index = 0; index < columns.length; index++) {
      const element = columns[index];
      if (index === 110) {
        break;
      } else {
        body2.push(element.name);
        header.push(element.label);
      }
    }

    const dataPdf = [];
    data.map((j, k) => {
      let dataB = [];
      body2.map((e, i) => {
        dataB.push(j[e]);
      });
      dataPdf.push(dataB);
    });

    let content = {
      startY: 50,
      head: [header],
      body: dataPdf,
      margin: {
        horizontal: 7,
      },
      bodyStyles: {
        valign: 'top',
      },
      styles: {
        overflow: 'visible',
        cellWidth: 'wrap',
        tableWidth: 300,
        fontSize: 6,
      },
      columnStyles: {
        text: {
          cellWidth: 'auto',
        },
      },
      horizontalPageBreak: true,
      // repeat this column in split pages
      horizontalPageBreakRepeat: 0,
    };

    doc.text(
      `${titlePdf} ${new Date().toLocaleDateString('en-US')}`,
      marginLeft,
      40,
    );
    doc.autoTable(content);
    doc.save(
      `${data.length} ${titlePdf} ${new Date().toLocaleDateString(
        'en-US',
      )}.pdf`,
    );
  };
});

export default ExportPdf;
ExportPdf.propTypes = {
  data: PropTypes.array.isRequired,
  titlePdf: PropTypes.any,
  columns: PropTypes.any,
};
