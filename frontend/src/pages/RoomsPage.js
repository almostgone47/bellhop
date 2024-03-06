import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {FaPlusCircle} from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

import Rooms from '../components/Rooms';

function RoomsPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const res = await axios.get('/rooms');
      setRooms(res.data);
    } catch (error) {
      console.error('Failed to load room types:', error);
      toast.error('Failed to load room types');
    }
  };

  const gotToEditPage = (room) => {
    navigate('/settings/updateRoom', {state: {room}});
  };

  const onDeleteRoom = async (id) => {
    try {
      await axios.delete(`/rooms/${id}`);
      setRooms(rooms.filter((room) => room.room_id !== id));
      toast.success('Room Deleted');
    } catch (error) {
      console.error('Error deleting room type:', error);
      toast.error('Error deleting room type');
    }
  };

  return (
    <section className="content-area">
      <h2>Rooms</h2>
      <p id="addRoomBtn">
        <Link to="/settings/createRoom">
          <FaPlusCircle /> Add Room
        </Link>
      </p>
      {rooms.length > 0 ? (
        <Rooms rooms={rooms} onDelete={onDeleteRoom} />
      ) : (
        <p>No rooms available.</p>
      )}
    </section>
  );
}

export default RoomsPage;
