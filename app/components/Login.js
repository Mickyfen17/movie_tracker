import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  handleUserInput(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  login(e) {
    e.preventDefault();
    const { password, email } = this.state;
    const { history, signIn } = this.props;
    fetch('/api/users', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if(response.status > 300) {
        this.setState({
          error: 'Email and password do not match',
          email: '',
          password: ''
        });
        throw Error('Email and password do not match');
      } else {
        history.push('/')
        response.json().then(json => {
          signIn(json.data)
        });
      }
    })
    .catch(error => {
      console.log('Email and password do not match');
    })
  }

  render() {
    return(
      <div>
        <h2 className="log-title">Login Page</h2>
        <form className="login">
          <input
            className="email"
            type="text"
            placeholder="E-Mail"
            name="email"
            value={this.state.email}
            onChange={ (e) => this.handleUserInput(e) }
          />
          <input
            className="password"
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={ (e) => this.handleUserInput(e) }
          />

        <button className="submit-btn" onClick={ (e) => this.login(e) } >Submit</button>
        { this.state.error !== '' && <h2>{this.state.error}</h2>}

        </form>
      </div>
    );
  }
}
