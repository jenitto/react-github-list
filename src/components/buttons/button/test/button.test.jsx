import React from 'react';
import { shallow } from 'enzyme';
import Button from '../button';

describe('<Button />', () => {
  let button;

  beforeAll(() => {
    button = {
      type: 'primary',
      label: 'Boton',
      hasRipple: true,
      disabled: false,
      isLoading: false,
      onClick: () => {},
    };
  });

  test('Button render correctly with a custom className', () => {
    const customClassName = 'custom-class';
    const wrapper = shallow(<Button {...button} className={customClassName}></Button>);
    expect(wrapper.hasClass(customClassName)).toEqual(true);
  });

  test('Button render correctly and launch onClick event', () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(<Button {...button} onClick={clickHandler}></Button>);
    wrapper.simulate('click');
    expect(clickHandler).toBeCalled();
  });

  test('Render disabled correctly', () => {
    const wrapper = shallow(<Button {...button} disabled={true}></Button>);
    expect(wrapper.props().disabled).toBe(true);
    wrapper.simulate('click');
  });
});
