import React, { Component } from 'react';

export default class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  }

  validateEmail(email) {
    const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return valid.test(email);
  }

  handleCreateUser(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  createUser(e) {
    e.preventDefault();
    const { password, email, name } = this.state;
    const { history } = this.props;

    if (!this.validateEmail(email)) {
      this.setState({
        error: 'Please enter a valid email'
      })
      return
    }
    fetch('/api/users/new', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password, name })
    })
    .then(response => {
      if(response.status > 300) {
        this.setState({
          error: 'Email in use',
          email: '',
          password: '',
          name: ''
        });
        throw Error('Email in use');
      }
      history.push('/login')
    })
    .catch(error => {
      console.log('Email in use');
    })
  }

  render() {
    return(
      <div>
        <h6>Create Account Page</h6>
        <form className="login">
          <input
            className="name"
            placeholder="Name"
            type="text"
            name="name"
            value={this.state.name}
            onChange={ (e) => this.handleCreateUser(e) }
          />
          <input
            className="email"
            placeholder="E-Mail"
            type="email"
            name="email"
            value={this.state.email}
            onChange={ (e) => this.handleCreateUser(e) }
          />
          <input
            className="password"
            placeholder="Password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={ (e) => this.handleCreateUser(e) }
          />

        <button className="submit-btn" onClick={ (e) => this.createUser(e) } >Create</button>

        { this.state.error !== '' && <h2>{this.state.error}</h2>}
      </form>
    </div>
    );
  }
}
