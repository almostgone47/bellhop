import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {FaPlusCircle} from 'react-icons/fa';
import RoomTypes from '../components/RoomTypes';

function RoomTypesPage() {
  const navigate = useNavigate();
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    loadRoomTypes();
  }, []);

  const loadRoomTypes = async () => {
    try {
      const response = await fetch('/roomTypes');
      if (!response.ok) throw new Error('Failed to fetch room types');
      const data = await response.json();
      setRoomTypes(data);
    } catch (error) {
      console.error('Failed to load room types:', error);
    }
  };

  const onEditRoomType = (roomType) => {
    navigate('/updateRoomType', {state: {roomType}});
  };

  const onDeleteRoomType = async (id) => {
    try {
      const response = await fetch(`/roomTypes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRoomTypes(
          roomTypes.filter((roomType) => roomType.room_type_id !== id),
        ); // Ensure you're using the correct identifier key
      } else {
        throw new Error(`Failed to delete room type with ID: ${id}`);
      }
    } catch (error) {
      console.error('Error deleting room type:', error);
    }
  };

  return (
    <section className="content-area">
      <h2>Room Types</h2>
      <p id="addRoomTypeBtn">
        <Link to="/createRoomType">
          <FaPlusCircle /> Add Room Type
        </Link>
      </p>
      {roomTypes.length > 0 ? (
        <RoomTypes
          roomTypes={roomTypes}
          onEdit={onEditRoomType}
          onDelete={onDeleteRoomType}
        />
      ) : (
        <p>No room types available.</p>
      )}
    </section>
  );
}

export default RoomTypesPage;
