import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import SearchBookingsInput from './SearchBookingsInput';
import {RxAvatar} from 'react-icons/rx';

import logo from '../logo.png';

function Navbar() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const navToSettings = () => {
    navigate('/settings/roomTypes');
    setIsVisible(false);
  };

  return (
    <nav className="main-nav">
      <div id="header-logo-container">
        <img src={logo} id="header-logo" alt="initials logo" />
        <h1>BellHop</h1>
      </div>
      <div>
        <SearchBookingsInput />
        <NavLink to="/">Bookings</NavLink>
        <NavLink to="/customers">Customers</NavLink>
      </div>
      <RxAvatar
        style={{width: '40px', height: '40px', cursor: 'pointer'}}
        onClick={toggleDropdown}
      />
      {isVisible && (
        <div
          id="settingsDropDown"
          style={{maxWidth: '230px', padding: '10px'}}
          onClick={navToSettings}
        >
          Settings
        </div>
      )}
    </nav>
  );
}

export default Navbar;
