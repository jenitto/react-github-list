import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './table-header/table-header';
import Checkbox from '../inputs/checkbox/checkbox';
import TableCellHeader from './table-cell-header/table-cell-header';
import TableCell from './table-cell/table-cell';
import TableFooter from './table-footer/table-footer';

const Table = ({
  columns,
  data,
  selected,
  check = false,
  size,
  sizes,
  page,
  total,
  isLoading,
  onChangeSearchValue,
  changeSelected,
  changeSelectedAll,
  changeSize,
  changePage,
}) => (
  <div className='table'>
    <TableHeader totalSelected={selected.length} onChangeSearchValue={onChangeSearchValue}></TableHeader>
    <div className='table__table-wrapper'>
      <table className='table__table'>
        <thead className='table__head'>
          <tr className='table__row table--head'>
            {check ? (
              <th className='table__cell'>
                <Checkbox
                  value={'all'}
                  checked={selected.length > 0 && selected.length === data.length}
                  indeterminate={selected.length > 0 && selected.length < data.length}
                  setChecked={() => changeSelectedAll()}
                ></Checkbox>
              </th>
            ) : null}
            {columns.map((column) => (
              <TableCellHeader key={column.id} content={column.label} value={column.id} maxWidth={column.maxWidth} />
            ))}
          </tr>
        </thead>
        <tbody className='table__body'>
          {data.length
            ? data.map((row) => (
                <tr key={row.id} className={`table__row table__row--normal ${check ? 'checkable' : ''}`}>
                  {check ? (
                    <td className='table__cell'>
                      <Checkbox
                        value={row.id}
                        checked={!!selected.find((item) => row.id === item.id)}
                        setChecked={() => changeSelected(row)}
                      ></Checkbox>
                    </td>
                  ) : null}
                  {columns.map((column) => (
                    <TableCell key={`${column.id}-${row.id}`} content={row[column.id]} maxWidth={column.maxWidth} />
                  ))}
                </tr>
              ))
            : !isLoading && (
                <tr>
                  <td className='table__cell'>No results</td>
                </tr>
              )}
        </tbody>
      </table>
    </div>
    <TableFooter
      size={size}
      sizes={sizes}
      page={page}
      total={total}
      changePage={changePage}
      changeSize={changeSize}
    ></TableFooter>
  </div>
);

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      maxWidth: PropTypes.string,
    }),
  ).isRequired,
  selected: PropTypes.array,
  check: PropTypes.bool,
  size: PropTypes.number.isRequired,
  sizes: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  onChangeSearchValue: PropTypes.func,
  changeSelected: PropTypes.func,
  changeSelectedAll: PropTypes.func,
  changeSize: PropTypes.func,
  changePage: PropTypes.func,
};

export default Table;
