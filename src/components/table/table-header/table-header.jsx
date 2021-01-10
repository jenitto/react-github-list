import React from 'react';
import PropTypes from 'prop-types';
import ButtonPrimary from '../../buttons/button-primary/button-primary';
import InputText from '../../inputs/input-text/Input-text';

const TableHeader = ({ totalSelected, onChangeSearchValue }) => {
  return (
    <div className='table-header'>
      <div className='table-header__container table-header__container--left'>
        <InputText label='Buscar' onChange={onChangeSearchValue}></InputText>
        {totalSelected ? <span className='table-header__chip'>{totalSelected} elementos seleccionados</span> : null}
      </div>
      <div className='table-header__container table-header__container--right'>
        <ButtonPrimary
          className='table-header__button-principal'
          label='Btn 1'
          hasRipple
          onClick={() => console.log('click')}
        ></ButtonPrimary>
      </div>
    </div>
  );
};

TableHeader.propTypes = {
  totalSelected: PropTypes.number,
  onChangeSearchValue: PropTypes.func,
};

export default TableHeader;
