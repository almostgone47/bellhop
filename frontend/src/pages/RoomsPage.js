import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {FaPlusCircle} from 'react-icons/fa';
import Rooms from '../components/Rooms';

function RoomsPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const response = await fetch('/rooms');
      if (!response.ok) throw new Error('Failed to fetch room types');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Failed to load room types:', error);
    }
  };

  const onEditRoom = (room) => {
    navigate('/updateRoom', {state: {room}});
  };

  const onDeleteRoom = async (id) => {
    try {
      const response = await fetch(`/rooms/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRooms(rooms.filter((room) => room.room_id !== id));
      } else {
        throw new Error(`Failed to delete room type with ID: ${id}`);
      }
    } catch (error) {
      console.error('Error deleting room type:', error);
    }
  };

  return (
    <section className="content-area">
      <h2>Rooms</h2>
      <p id="addRoomBtn">
        <Link to="/createRoom">
          <FaPlusCircle /> Add Room
        </Link>
      </p>
      {rooms.length > 0 ? (
        <Rooms rooms={rooms} onEdit={onEditRoom} onDelete={onDeleteRoom} />
      ) : (
        <p>No rooms available.</p>
      )}
    </section>
  );
}

export default RoomsPage;
