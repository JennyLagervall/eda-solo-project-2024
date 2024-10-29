import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Example icon


function LandingPage() {
  const user = useSelector((store) => store.user);
  const [heading, setHeading] = useState(`Welcome to GRANTITUDE`);
  const history = useHistory();

  // Navigate to login page
  const onLogin = () => {
    history.push('/login');
  };

  // Navigate to grant list
  const onSeeGrants = () => {
    history.push('/grantlist'); // Assuming '/grantlist' is the correct route
  };

  return (
    <div className='landing-container'>
      <h2
        style={{
          color: 'white',
          textAlign: 'center', // Center the text horizontally
          paddingTop: '10px',
          fontSize: '60px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        WELCOME TO
      </h2>
      <h1
        style={{
          color: 'white',
          textAlign: 'center', // Center the title horizontally
          paddingBottom: '30px',
          fontSize: '100px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
        className='GrantitudeHeader'
      >
        GRANTITUDE
      </h1>

      <div className='logo-landing-container'>
        <img className='logoLanding' src='/grantLogo.png' alt='Grantitude Logo' />
      </div>
      {user.id && (
        <center>
          <button
            className='btn btn-lg'
            style={{
              padding: '15px 30px',
              fontSize: '24px',
              backgroundColor: '#637dbd',
              border: 'none',
              color: 'white',
              borderRadius: '0.5rem',
              marginTop: '20px',
            }}
            onClick={onSeeGrants}
          >
            <FontAwesomeIcon icon={faArrowRight} style={{ marginRight: '10px' }} /> {/* Icon */}
            See All Grants
          </button>
        </center>
      )}
    </div>
  );
}

export default LandingPage;
