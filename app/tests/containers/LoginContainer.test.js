import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import LoginContainer from '../../containers/LoginContainer';
import Login from '../../components/Login';

const mockStore = configureMockStore()({
  user: {
    name: 'Mike',
    email: 'mike@mike.com',
    id: 1,
    signedIn: true
  }
})

const setup = () => {
  const Container = mount(
    <Provider store={ mockStore } >
      <LoginContainer />
    </Provider>
  );
  const Component = Container.find(Login);
  return {
    Container,
    Component
  }
}

describe('LoginContainer', () => {
  const { Container, Component } = setup();

  it('should pass the appropriate props from state', () => {
    expect(Component.props().user).toEqual({
      name: 'Mike',
      email: 'mike@mike.com',
      id: 1,
      signedIn: true
    });
  });

  it('should pass down the correct action creaters props from state', () => {
    expect(Object.keys(Component.props())).toContain(
      'signIn'
    );
  });
});