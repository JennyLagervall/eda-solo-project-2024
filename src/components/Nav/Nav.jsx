import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className='navbar-nav'>
      <div className='navbar-left'>
        <img className='logo' src='/grantLogo.png' alt='Grantitude Logo' />
        <Link to='/home'>
          <h2 className='navbar-title'>Grantitude</h2>
        </Link>
      </div>
      <div className='navbar-right'>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className='navbar-link' to='/login'>
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className='navbar-link' to='/home'>
              Home
            </Link>

            <Link className='navbar-link' to='/grantlist'>
              Grant List
            </Link>

            <Link className='navbar-link' to='/grantform'>
              Add Grant
            </Link>

            <Link className='navbar-link' to='/administrator'>
              Admin
            </Link>
            <LogOutButton className='navbar-link' />
            <Link className='navbar-link' style={{ color: '#ffcc00', fontWeight: 'bold' }}>
              Hello, {user.first_name}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;



