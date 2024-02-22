import React from 'react';
import {NavLink} from 'react-router-dom';

function Navbar() {
  return (
    <nav className="main-nav">
      <NavLink to="/">Booking</NavLink>
      <NavLink to="/rooms">Rooms</NavLink>
      <NavLink to="/roomTypes">Room Types</NavLink>
      <NavLink to="/customers">Guests</NavLink>
    </nav>
  );
}

export default Navbar;
