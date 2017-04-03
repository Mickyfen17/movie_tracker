import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import CreateUser from '../../components/CreateUser';
import fetchMock from 'fetch-mock';



describe('testing CreateUser', () => {
  
  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });
  
  it('should have a default state', () => {
    const wrapper = shallow(<CreateUser />);
    
    expect(wrapper.state()).toEqual({ 
      name: '',
      email: '',
      password: '',
      error: ''
    });
  });
  
  it('should allow user adding to input fields to update state', () => {
    const wrapper = shallow(<CreateUser />);
    
    const nameInput = wrapper.find('input[name="name"]');
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    
    nameInput.simulate('change', {
      target: {
        name: 'name',
        value: 'Hamburglar'
      }
    });
    emailInput.simulate('change', {
      target: {
        name: 'email',
        value: 'bla@blah.com'
      }
    });
    passwordInput.simulate('change', {
      target: {
        name: 'password',
        value: 'supersecure'
      }
    });
    
    expect(wrapper.state()).toEqual({
      name: 'Hamburglar',
      email: 'bla@blah.com',
      password: 'supersecure',
      error: ''
    });
  });
  
  it('should display error when invalid email is entered', () => {
    const wrapper = shallow(<CreateUser />);
    
    const nameInput = wrapper.find('input[name="name"]');
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const submitButton = wrapper.find('button');
    
    nameInput.simulate('change', {
      target: {
        name: 'name',
        value: 'Hamburglar'
      }
    });
    emailInput.simulate('change', {
      target: {
        name: 'email',
        value: 'thisisnotarealemail'
      }
    });
    passwordInput.simulate('change', {
      target: {
        name: 'password',
        value: 'supersecure'
      }
    });
    submitButton.simulate('click');
    
    const displayedError = wrapper.find('h2').last();
    
    expect(wrapper.state().error).toEqual('Please enter a valid email');
    expect(displayedError.length).toEqual(1);
    expect(displayedError.text()).toEqual('Please enter a valid email');
  });
  
  it('should display error when email is already used for an account', async () => {
    fetchMock.post('http://localhost:3000/api/users/new', {
      status: 500,
      body: {}
    });
    const wrapper = shallow(<createUser />);
    const nameInput = wrapper.find('input[name="name"]');
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const submitButton = wrapper.find('button');
    
    nameInput.simulate('change', {
      target: {
        name: 'name',
        value: 'Hamburglar'
      }
    });
    emailInput.simulate('change', {
      target: {
        name: 'email',
        value: 'thisisnotarealemail'
      }
    });
    passwordInput.simulate('change', {
      target: {
        name: 'password',
        value: 'supersecure'
      }
    });
    
    submitButton.simulate('click');
    await wrapper.update();
    
    const displayedError = wrapper.find('h2').last();
    
    expect(wrapper.state().error).toEqual('Email in use');
    expect(displayedError.length).toEqual(1);
    expect(displayedError.text()).toEqual('Email in use');
    
    done();
  });
});