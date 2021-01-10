import React from 'react';
import { shallow } from 'enzyme';
import InputText from '../Input-text';

describe('<InputText />', () => {
  let input;

  beforeAll(() => {
    input = {
      label: 'Label',
      disabled: false,
      onChange: () => {},
    };
  });

  test('Input render correctly with a custom className', () => {
    const customClassName = 'custom-class';
    const wrapper = shallow(<InputText {...input} className={customClassName}></InputText>);
    expect(wrapper.hasClass(customClassName)).toEqual(true);
  });

  test('Launch onChange event on keypress', () => {
    const handler = jest.fn();
    const wrapper = shallow(<InputText {...input} onChange={handler}></InputText>);
    wrapper.find('input').simulate('change', { target: { value: 'Hello' } });
    expect(handler).toBeCalled();
  });

  test('Render disabled correctly', () => {
    const wrapper = shallow(<InputText {...input} disabled={true}></InputText>);
    expect(wrapper.find('input').props().disabled).toBe(true);
    wrapper.simulate('click');
  });
});
