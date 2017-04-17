import React from 'react';
import { shallow } from 'enzyme';
import { browserHistory } from 'react-router';
import fetchMock from 'fetch-mock';
import Login from '../../components/Login';


describe('testing Login', () => {
  const mockUser = {
    id: 1,
    name: 'Mike',
    email: 'mike@mike.com',
    signIn: true
  }

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('should have a default state', () => {
    const wrapper = shallow( <Login /> )

    expect(wrapper.state()).toEqual({ 'email': '', 'error': '', 'password': '' })
  })

  it('be able to add text to inputs and update state', () => {
    const wrapper = shallow( <Login /> )
    const emailInput =  wrapper.find('input[name="email"]');
    const passwordInput =  wrapper.find('input[name="password"]');

    emailInput.simulate('change', {
      target: {
        name: 'email',
        value: 'abc@abc.com'
      }
    })
    passwordInput.simulate('change', {
      target: {
        name: 'password',
        value: 'password'
      }
    })

    expect(wrapper.state()).toEqual({ email: 'abc@abc.com', password: 'password', error: '' })
  })

  it('should display error when login fails', async (done) => {
    fetchMock.post('http://localhost:3001/api/users', {
      status: 500,
      body: {}
    });
    const wrapper = shallow( <Login /> )
    const emailInput =  wrapper.find('input[name="email"]');
    const submitBtn =  wrapper.find('button');

    emailInput.simulate('change', {
      target: {
        name: 'email',
        value: 'abc@abc.com'
      }
    })

    submitBtn.simulate('click', {
      preventDefault: jest.fn()
    });

    await wrapper.update();

    const displayedError = wrapper.find('h2').last();

    expect(wrapper.state().error).toEqual('Email and password do not match')
    expect(displayedError.length).toEqual(1)
    expect(displayedError.text()).toEqual('Email and password do not match')

    done();
  })

  it('should redirect to dashboard on successful login', async (done) => {
    spyOn(browserHistory, 'push');
    fetchMock.post('http://localhost:3001/api/users', {
      status: 200,
      body: mockUser
    });

    const wrapper = shallow(
      <Login
        history={ browserHistory }
        signIn={ jest.fn() }
      />
    )
    const emailInput =  wrapper.find('input[name="email"]');
    const passwordInput =  wrapper.find('input[name="password"]');
    const submitBtn =  wrapper.find('button');

    emailInput.simulate('change', {
      target: {
        name: 'email',
        value: 'abc@abc.com'
      }
    })
    passwordInput.simulate('change', {
      target: {
        name: 'password',
        value: 'password'
      }
    })

    submitBtn.simulate('click', {
      preventDefault: jest.fn()
    });

    await wrapper.update();

    expect(browserHistory.push).toHaveBeenCalledWith('/');

    done();
  });
});