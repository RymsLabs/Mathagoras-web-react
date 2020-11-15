import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import '../components/pages/QuizPage/Quiz.css';


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            MATHAGORAS
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {/* <li className='nav-item'>
              <Link to='/' 
               className='nav-links'
               onClick={closeMobileMenu}>
                Home
              </Link>
            </li> */}

            <li className='nav-item'> 
              <Link
                to='/quizapp'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Quiz
              </Link>
            </li>

          


            {/* <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Features
              </Link>
            </li> */}
            {/* <li className='nav-item'>
              <Link
                to='/Log'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Log In
              </Link>
            </li> */}

            {/* <li className='nav-item'>
              <Link to='/' 
               className='nav-links'
               onClick={closeMobileMenu}>
                Log Out
              </Link>
            </li> */}
          </ul>
          {button && <Button buttonStyle='btn--outline' link='/' onClick={() =>{window.sessionStorage.removeItem("token")}}>Log Out</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
