import * as React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import { create, ReactTestRenderer } from 'react-test-renderer';

import CheckBox, { CheckBoxProp } from '../components/CheckBox';

let wrapper: ShallowWrapper<CheckBoxProp>;
let snapshot: ReactTestRenderer;

beforeEach(() => {
  const checkbox = <CheckBox labelOn="On" labelOff="Off" />;

  wrapper = shallow(checkbox);
  snapshot = create(checkbox);
});

describe('<CheckBox />', () => {
  test('it matches the snapshot', () => {
    expect(snapshot.toJSON()).toMatchSnapshot();
  });

  it('it should toggle checkbox label after click event', () => {
    expect(wrapper.text()).toEqual('Off');

    wrapper.find('input').simulate('change');

    expect(wrapper.text()).toEqual('On');
  });
});