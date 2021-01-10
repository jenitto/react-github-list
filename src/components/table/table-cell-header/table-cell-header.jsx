import React from 'react';
import PropTypes from 'prop-types';

const TableCellHeader = ({ content, maxWidth }) => {
  return (
    <th className={'table__cell table-cell-header'} style={{ maxWidth: maxWidth ? maxWidth : 'auto' }}>
      <span className='table-cell-header__label table-cell-header__placeholder'>{content}</span>
    </th>
  );
};

TableCellHeader.propTypes = {
  content: PropTypes.any.isRequired,
  maxWidth: PropTypes.string,
};

export default TableCellHeader;
