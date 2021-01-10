import React from 'react';
import { shallow } from 'enzyme';
import ButtonSecondary from '../button-secondary';

describe('<Button />', () => {
  let button;

  beforeAll(() => {
    button = {
      type: 'secondary',
      label: 'Boton',
      hasRipple: true,
      disabled: false,
      isLoading: false,
      onClick: () => {},
    };
  });

  test('Button render correctly with secondary type', () => {
    const customClassName = 'custom-class';
    const wrapper = shallow(<ButtonSecondary {...button} className={customClassName}></ButtonSecondary>);
    expect(wrapper.hasClass(customClassName)).toEqual(true);
  });
});
