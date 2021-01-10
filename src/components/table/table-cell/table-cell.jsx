import React from 'react';
import PropTypes from 'prop-types';

const TableCell = ({ content, maxWidth }) => {
  return (
    <td className='table__cell' style={{ maxWidth: maxWidth ? maxWidth : 'auto' }}>
      {content}
    </td>
  );
};

TableCell.propTypes = {
  content: PropTypes.any.isRequired,
  maxWidth: PropTypes.string,
};

export default TableCell;
