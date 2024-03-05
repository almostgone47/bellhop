import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

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

import SettingsLayout from './layouts/SettingsLayout';

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <Toaster position="top-center" />
          <Navbar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<BookingsPage />} />
            <Route path="/createBooking" element={<AddBookingPage />} />
            <Route path="/updateBooking" element={<EditBookingPage />} />

            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/updateCustomer" element={<EditCustomerPage />} />
            <Route path="/createCustomer" element={<AddCustomerPage />} />

            <Route path="/settings" element={<SettingsLayout />}>
              <Route path="/settings/rooms" element={<RoomsPage />} />
              <Route path="/settings/updateRoom" element={<EditRoomPage />} />
              <Route path="/settings/createRoom" element={<AddRoomPage />} />

              <Route path="/settings/roomTypes" element={<RoomTypesPage />} />
              <Route
                path="/settings/updateRoomType"
                element={<EditRoomTypePage />}
              />
              <Route
                path="/settings/createRoomType"
                element={<AddRoomTypePage />}
              />
            </Route>
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
