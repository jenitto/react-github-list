import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { iconChevronBottom } from '../../../assets/icons/_icons';

const ARROW_KEY_UP = 'ArrowUp';
const ARROW_KEY_DOWN = 'ArrowDown';
const ESCAPE_KEY = 'Escape';
const ENTER_KEY = 'Enter';

const Select = ({ className = '', selected, options, disabled, onSelectionChange }) => {
  const ref = useRef();
  const [opened, setOpened] = useState(false);

  useOutsideClick(ref, () => {
    handleOpenSelect(false);
  });

  const handleKeyDownSelect = (e) => {
    if (e.key === ENTER_KEY) {
      handleOpenSelect(!opened);
    } else if (e.key === ESCAPE_KEY) {
      handleOpenSelect(false);
    }
  };

  const handleKeyDownOption = (e, option, index) => {
    if (e.key === ENTER_KEY) {
      handleSelectChanges(option);
      e.stopPropagation();
    } else if (e.key === ARROW_KEY_UP) {
      e.preventDefault();
      e.stopPropagation();
      handleFocus(index - 1);
    } else if (e.key === ARROW_KEY_DOWN) {
      e.preventDefault();
      e.stopPropagation();
      handleFocus(index + 1);
    } else if (e.key === ESCAPE_KEY) {
      handleOpenSelect(false);
    }
  };

  const handleOpenSelect = (open) => {
    if (disabled) {
      return;
    }
    setOpened(open);
  };

  const handleFocus = (index) => {
    const length = Object.keys(focusableElements).length;
    if (index >= length) {
      index = 0;
    } else if (index < 0) {
      index = length - 1;
    }
    focusableElements[`item-${index}`].focus();
  };

  const handleSelectChanges = (selectedOption) => {
    if (disabled || selectedOption.disabled) {
      return;
    }

    handleOpenSelect(false);

    onSelectionChange(selectedOption);
  };

  const isSelected = (option) => selected === option;

  const focusableElements = [];
  disabled = disabled || !options.length;

  return (
    <div ref={ref} className={`select ${className} ${opened ? 'opened' : 'closed'} ${disabled ? 'disabled' : ''}`}>
      <div
        className={`select__selected ${disabled ? 'disabled' : ''}`}
        tabIndex={`${disabled ? -1 : 0}`}
        onKeyDown={handleKeyDownSelect}
        onClick={() => handleOpenSelect(!opened)}
      >
        {selected}
        <span className='select__select-icon'>{iconChevronBottom()}</span>
      </div>
      {opened ? (
        <div className='select__select'>
          <div className='select__focus-trap' tabIndex='0' onFocus={() => handleFocus(0)} />
          {options.map((item, index) => (
            <div
              key={item}
              ref={(x) => (focusableElements[`item-${index}`] = x)}
              className={`select__option ${item.disabled ? 'disabled' : ''} ${isSelected(item) ? 'selected' : ''}`}
              tabIndex='0'
              onClick={() => handleSelectChanges(item)}
              onKeyDown={(e) => handleKeyDownOption(e, item, index)}
            >
              <span className='select__option-label'>{item}</span>
            </div>
          ))}
          <div
            className='select__focus-trap'
            tabIndex='0'
            onFocus={() => handleFocus(Object.keys(focusableElements).length - 1)}
          />
        </div>
      ) : null}
    </div>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  onSelectionChange: PropTypes.func.isRequired,
};

export default Select;
