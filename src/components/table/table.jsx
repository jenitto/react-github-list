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
  actionLabel,
  selected,
  disabledButton,
  check = false,
  size,
  sizes,
  page,
  total,
  isLoading,
  onActionClick,
  onChangeSearchValue,
  onChangeSelected,
  onChangeSelectedAll,
  onChangeSize,
  onChangePage,
}) => (
  <div className='table'>
    <TableHeader
      actionLabel={actionLabel}
      totalSelected={selected.length}
      disabledButton={disabledButton}
      onActionClick={onActionClick}
      onChangeSearchValue={onChangeSearchValue}
    ></TableHeader>
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
                  onChange={() => onChangeSelectedAll()}
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
                        onChange={() => onChangeSelected(row)}
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
      onChangePage={onChangePage}
      onChangeSize={onChangeSize}
    ></TableFooter>
  </div>
);

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      maxWidth: PropTypes.string,
    }),
  ).isRequired,
  actionLabel: PropTypes.string,
  selected: PropTypes.array,
  disabledButton: PropTypes.bool,
  check: PropTypes.bool,
  size: PropTypes.number.isRequired,
  sizes: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  onActionClick: PropTypes.func,
  onChangeSearchValue: PropTypes.func,
  onChangeSelected: PropTypes.func,
  onChangeSelectedAll: PropTypes.func,
  onChangeSize: PropTypes.func,
  onChangePage: PropTypes.func,
};

export default Table;
