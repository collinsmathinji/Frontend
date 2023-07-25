import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Footer = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleClick = () => {
    console.log('handleClick called');
    navigate('/emergency');
  };

  return (
    <header>
      <div className="container2">
        {!user && (
          <Link to="/about">
            About Me
          </Link>
        )}
        <nav>
          {user && (
            <div className='footercon'>
              <button onClick={handleClick} className='navout'>in case of Emergency</button>
            </div>
          )}
          {!user && (
            <div className='footercon'>
              <Link to="/stop" className='prevent'>Lets End this deaths</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Footer;
