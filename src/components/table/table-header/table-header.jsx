import React from 'react';
import PropTypes from 'prop-types';
import ButtonPrimary from '../../buttons/button-primary/button-primary';
import InputText from '../../inputs/input-text/Input-text';

const TableHeader = ({ actionLabel, totalSelected, disabledButton, onActionClick, onChangeSearchValue }) => {
  return (
    <div className='table-header'>
      <div className='table-header__container table-header__container--left'>
        <InputText label='Buscar' onChange={onChangeSearchValue}></InputText>
        {totalSelected ? <span className='table-header__chip'>{totalSelected} elementos seleccionados</span> : null}
      </div>
      <div className='table-header__container table-header__container--right'>
        {onActionClick && (
          <ButtonPrimary
            className='table-header__button-principal'
            label={actionLabel}
            hasRipple
            disabled={disabledButton}
            onClick={onActionClick}
          ></ButtonPrimary>
        )}
      </div>
    </div>
  );
};

TableHeader.propTypes = {
  actionLabel: PropTypes.string,
  totalSelected: PropTypes.number,
  disabledButton: PropTypes.bool,
  onActionClick: PropTypes.func,
  onChangeSearchValue: PropTypes.func,
};

export default TableHeader;
