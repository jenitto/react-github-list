import React from 'react';
import { shallow } from 'enzyme';
import ButtonPrimary from '../button-primary';

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

  test('Button render correctly with primary type', () => {
    const customClassName = 'custom-class';
    const wrapper = shallow(<ButtonPrimary {...button} className={customClassName}></ButtonPrimary>);
    expect(wrapper.hasClass(customClassName)).toEqual(true);
  });
});
