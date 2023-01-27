import {
  ExcelExport,
  ExcelExportColumn,
} from '@progress/kendo-react-excel-export';
import {useRef, useImperativeHandle, forwardRef} from 'react';

const ExcelExportComponent = forwardRef(
  ({data, title = 'no_name', columns}, ref) => {
    const _exporter = useRef(null);

    useImperativeHandle(ref, () => ({
      exportExcel() {
        save(_exporter);
      },
    }));

    const save = (component) => {
      const options = component.current.workbookOptions();
      const rows = options.sheets[0].rows;
      let altIdx = 0;
      rows.forEach((row) => {
        if (row.type === 'data') {
          if (altIdx % 2 !== 0) {
            row.cells.forEach((cell) => {
              cell.background = '#aabbcc';
            });
          }
          altIdx++;
        }
      });
      component.current.save(options);
    };

    return (
      <>
        <ExcelExport
          data={data}
          fileName={`${data.length} ${title} ${new Date().toLocaleDateString(
            'en-US',
          )}.xlsx`}
          ref={_exporter}
        >
          {columns.map((item, i) => {
            return (
              <ExcelExportColumn
                key={i}
                field={item.name}
                title={item.label}
                width={200}
              />
            );
          })}
        </ExcelExport>
      </>
    );
  },
);

export default ExcelExportComponent;

ExcelExportComponent.propTypes = {
  data: PropTypes.array.isRequired,
  titlePdf: PropTypes.any,
  columns: PropTypes.any,
  title: PropTypes.any,
};
