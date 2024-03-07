import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FaPlusCircle} from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

import Rooms from '../components/Rooms';
import Row from '../components/Row';

function RoomsPage() {
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
      <Row>
        <h2>Rooms</h2>
        <Link to="/settings/createRoom">
          <button>
            <FaPlusCircle /> Add Room
          </button>
        </Link>
      </Row>
      {rooms.length > 0 ? (
        <Rooms rooms={rooms} onDelete={onDeleteRoom} />
      ) : (
        <p>No rooms available.</p>
      )}
    </section>
  );
}

export default RoomsPage;
