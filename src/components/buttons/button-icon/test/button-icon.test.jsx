import React from 'react';
import { shallow } from 'enzyme';
import ButtonIcon from '../button-icon';
import { iconCross } from '../../../../assets/icons/_icons';

describe('<ButtonIcon />', () => {
  let button;

  beforeAll(() => {
    button = {
      icon: iconCross(),
      disabled: false,
      onClick: () => {},
    };
  });

  test('Button render correctly with a custom className', () => {
    const customClassName = 'custom-class';
    const wrapper = shallow(<ButtonIcon {...button} className={customClassName}></ButtonIcon>);
    expect(wrapper.hasClass(customClassName)).toEqual(true);
  });

  test('Button render correctly and launch onClick event', () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(<ButtonIcon {...button} onClick={clickHandler}></ButtonIcon>);
    wrapper.simulate('click');
    expect(clickHandler).toBeCalled();
  });

  test('Render disabled correctly', () => {
    const wrapper = shallow(<ButtonIcon {...button} disabled={true}></ButtonIcon>);
    expect(wrapper.props().disabled).toBe(true);
    wrapper.simulate('click');
  });
});
