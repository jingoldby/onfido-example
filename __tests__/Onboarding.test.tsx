import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Onboarding } from '../components/Onboarding';

it('has an error with onfido', () => {
  const onboarding = shallow(<Onboarding kycSubmitted={false} kycCompleted={false} user={{}} setKycSubmitted={false} />);
  console.log(onboarding);
})
