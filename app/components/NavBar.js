import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ signedIn, signOut, userID, history, fetchMovies, fetchFavorites, favorites }) => {

  const login = () => {
    if(!signedIn) {
      return (
        <button
          className='nav-button'
          onClick={ () => history.push('/login') }>
          Login
        </button>
      )
    } else {
      return (
        <button
          className='nav-button'
          onClick={ () => { signOut(); fetchMovies(); history.push('/') } }>
          Logout
        </button>
      )
    }
  }

  return (
    <nav>
      { login() }
      <button
        className='nav-button'
        onClick={ () => history.push('/create-user') }>
        Create Account
      </button>
      <button
        className='nav-button'
        onClick={ () => fetchFavorites('navFavorites', userID) }>
        { `Favorites ${favorites.length}` }
      </button>
    </nav>
  )
}

export default NavBar;