import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import BookingsPage from './pages/BookingsPage';
import AddBookingPage from './pages/AddBookingPage';
import EditBookingPage from './pages/EditBookingPage';

import RoomsPage from './pages/RoomsPage';
import AddRoomPage from './pages/AddRoomPage';
import EditRoomPage from './pages/EditRoomPage';

import RoomTypesPage from './pages/RoomTypesPage';
import AddRoomTypePage from './pages/AddRoomTypePage';
import EditRoomTypePage from './pages/EditRoomTypePage';

import CustomersPage from './pages/CustomersPage';
import AddCustomerPage from './pages/AddCustomerPage';
import EditCustomerPage from './pages/EditCustomerPage';
import logo from './logo.png';

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <div id="header-logo-container">
            <img src={logo} id="header-logo" alt="initials logo" />
            <h1>BellHop</h1>
          </div>
          <Navbar />
          <span></span>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<BookingsPage />} />
            <Route path="/createBooking" element={<AddBookingPage />} />
            <Route path="/updateBooking" element={<EditBookingPage />} />

            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/updateRoom" element={<EditRoomPage />} />
            <Route path="/addRoom" element={<AddRoomPage />} />

            <Route path="/roomTypes" element={<RoomTypesPage />} />
            <Route path="/updateRoomType" element={<EditRoomTypePage />} />
            <Route path="/addRoomType" element={<AddRoomTypePage />} />

            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/updateCustomer" element={<EditCustomerPage />} />
            <Route path="/addCustomer" element={<AddCustomerPage />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2024 Bellhop</p>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
