import React from 'react';
import { mount, shallow } from 'enzyme';
import { KEYBOARD_KEY } from '../../../../enums/keyboard-keys';
import Select from '../select';

describe('<Select />', () => {
  const options = [1, 2, 3, 4];

  const openSelect = (wrapper) => {
    wrapper.find('.select__selected').simulate('click');
  };

  const getOption = (node, index) => node.find('.select__option').at(index);

  // Guide to get focused element with enzyme -> https://github.com/enzymejs/enzyme/issues/2337
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'enzymeContainer';
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    container = null;
  });

  test('adds the additional className', () => {
    const testingClassName = 'test-class';
    const SelectComponent = shallow(
      <Select
        className={testingClassName}
        options={options}
        selected={options[0]}
        onSelectionChange={() => {}}
      ></Select>,
    );
    expect(SelectComponent.hasClass(testingClassName)).toEqual(true);
  });

  test('Is disabled', () => {
    const spyFn = jest.fn();
    const SelectComponent = shallow(
      <Select options={options} selected={options[0]} disabled={true} onSelectionChange={spyFn}></Select>,
    );
    expect(SelectComponent.hasClass('disabled')).toEqual(true);
    openSelect(SelectComponent);
    expect(spyFn).not.toBeCalled();
  });

  test('value is selected', () => {
    const SelectComponent = shallow(
      <Select options={options} selected={options[0]} onSelectionChange={() => {}}></Select>,
    );
    openSelect(SelectComponent);
    expect(getOption(SelectComponent, 0).hasClass('selected')).toEqual(true);
  });

  test('open/close and select new option', () => {
    const spyFn = jest.fn();
    const SelectComponent = shallow(
      <Select options={options} selected={options[0]} onSelectionChange={spyFn}></Select>,
    );
    openSelect(SelectComponent);
    expect(SelectComponent.hasClass('opened')).toEqual(true);
    SelectComponent.find('.select__option').last().simulate('click');
    expect(spyFn).toHaveBeenCalled();
    expect(SelectComponent.hasClass('closed')).toEqual(true);
  });

  test('open/close with keyboard', () => {
    const spyFn = jest.fn();
    const SelectComponent = shallow(
      <Select options={options} selected={options[0]} onSelectionChange={spyFn}></Select>,
    );
    SelectComponent.find('.select__selected').simulate('keyDown', { key: KEYBOARD_KEY.ENTER });
    SelectComponent.find('.select__selected').simulate('keyDown', { key: KEYBOARD_KEY.BACKSPACE }); // only for 100% coverage
    getOption(SelectComponent, 0).simulate('keyDown', { key: KEYBOARD_KEY.BACKSPACE }); // only for 100% coverage
    expect(SelectComponent.hasClass('opened')).toEqual(true);
    SelectComponent.find('.select__selected').simulate('keyDown', { key: KEYBOARD_KEY.ESCAPE });
    expect(SelectComponent.hasClass('closed')).toEqual(true);
  });

  test('option are focusable with keyboard', () => {
    const isFirstOption = (index) => index === 0;
    const isLastOption = (index, length) => index + 1 === length;

    const SelectComponent = mount(
      <Select options={options} selected={options[0]} onSelectionChange={() => {}}></Select>,
      {
        attachTo: document.getElementById('enzymeContainer'),
      },
    );
    openSelect(SelectComponent);

    let option, focusedElement;

    // ArrowDown
    for (let i = 0; i < options.length; i++) {
      option = getOption(SelectComponent, i);
      option.simulate('keyDown', { key: 'ArrowDown' });
      option = isLastOption(i, options.length) ? getOption(SelectComponent, 0) : getOption(SelectComponent, i + 1);
      focusedElement = document.activeElement;
      expect(option.getDOMNode() === focusedElement).toEqual(true);
    }

    // ArrowUp
    for (let i = options.length - 1; i >= 0; i--) {
      option = getOption(SelectComponent, i);
      option.simulate('keyDown', { key: 'ArrowUp' });
      option = isFirstOption(i) ? getOption(SelectComponent, options.length - 1) : getOption(SelectComponent, i - 1);
      focusedElement = document.activeElement;
      expect(option.getDOMNode() === focusedElement).toEqual(true);
    }
    SelectComponent.unmount();
  });

  test('option are selectable and close with keyboard', () => {
    const spyFn = jest.fn();
    const SelectComponent = mount(<Select options={options} selected={options[0]} onSelectionChange={spyFn}></Select>);

    let option;

    // Select new option with keyboard
    openSelect(SelectComponent);
    option = getOption(SelectComponent, 2);
    option.simulate('keyDown', { key: KEYBOARD_KEY.ENTER });
    expect(spyFn).toBeCalled();

    // Close with keyboard
    openSelect(SelectComponent);
    option = getOption(SelectComponent, 2);
    option.simulate('keyDown', { key: KEYBOARD_KEY.ESCAPE });
    expect(SelectComponent.find('.select').hasClass('closed')).toEqual(true);
    SelectComponent.unmount();
  });

  test('Test focus trap', () => {
    let focusedElement;

    const SelectComponent = mount(
      <Select options={options} selected={options[0]} onSelectionChange={() => {}}></Select>,
      {
        attachTo: document.getElementById('enzymeContainer'),
      },
    );

    openSelect(SelectComponent);

    // focus don't escape by start
    SelectComponent.find('.select__focus-trap').first().simulate('focus');
    focusedElement = document.activeElement;
    expect(getOption(SelectComponent, 0).getDOMNode() === focusedElement).toEqual(true);

    // focus don't escape by end
    SelectComponent.find('.select__focus-trap').last().simulate('focus');
    focusedElement = document.activeElement;
    expect(getOption(SelectComponent, options.length - 1).getDOMNode() === focusedElement).toEqual(true);
    SelectComponent.unmount();
  });
});
