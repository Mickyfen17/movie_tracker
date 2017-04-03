import React from 'react';
import { shallow, mount } from 'enzyme';
import { browserHistory } from 'react-router';
import NavBar from '../../components/NavBar';

describe('testing NavBar', () => {

  it('should contain 3 buttons', () => {
    const wrapper = shallow( <NavBar /> )

    expect(wrapper.find('button')).toHaveLength(3)
  });

  it('should accept default props', () => {
    const wrapper = mount(
      <NavBar
        signedIn={ true }
        userID={ 12345 }
      /> )

    expect(wrapper.props().userID).toEqual(12345)
    expect(wrapper.props().signedIn).toEqual(true)
  });

  it('should redirect to login page on click', () => {
    spyOn(browserHistory, 'push');
    const wrapper = mount( <NavBar history={ browserHistory }/> )
    const loginBtn = wrapper.find('button').first()
    loginBtn.simulate('click');

    expect(browserHistory.push).toHaveBeenCalledWith('/login');
  });

  it('should redirect to create-user page on click', () => {
    spyOn(browserHistory, 'push');
    const wrapper = mount( <NavBar history={ browserHistory }/> )
    const createAccBtn = wrapper.childAt(1)
    createAccBtn.simulate('click');

    expect(browserHistory.push).toHaveBeenCalledWith('/create-user');
  });
});