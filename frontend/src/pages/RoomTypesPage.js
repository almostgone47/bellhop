import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FaPlusCircle} from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

import RoomTypes from '../components/RoomTypes';
import Row from '../components/Row';

function RoomTypesPage() {
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    loadRoomTypes();
  }, []);

  const loadRoomTypes = async () => {
    try {
      const res = await axios.get('/roomTypes');
      setRoomTypes(res.data);
    } catch (error) {
      console.error('Failed to load room types:', error);
      toast.error('Failed to load room types');
    }
  };

  const onDeleteRoomType = async (id) => {
    try {
      const res = await axios.delete(`/roomTypes/${id}`);
      if (res.status === 200) {
        setRoomTypes(
          roomTypes.filter((roomType) => roomType.room_type_id !== id),
        );
      } else {
        toast.error(`Failed to delete room type with ID: ${id}`);
      }
    } catch (error) {
      console.error('Error deleting room type:', error);
    }
  };

  return (
    <section className="content-area">
      <Row>
        <h2>Room Types</h2>
        <Link to="/settings/createRoomType">
          <button>
            <FaPlusCircle /> Add Room Type
          </button>
        </Link>
      </Row>
      {roomTypes.length > 0 ? (
        <RoomTypes roomTypes={roomTypes} onDelete={onDeleteRoomType} />
      ) : (
        <p>No room types available.</p>
      )}
    </section>
  );
}

export default RoomTypesPage;
