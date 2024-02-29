import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

import Rooms from '../components/Rooms';
import {FaPlusCircle} from 'react-icons/fa';

function RoomPage() {
  // Use the Navigate for redirection
  const redirect = useNavigate();

  // Use state to bring in the data
  const [rooms, setRooms] = useState([]);

  // RETRIEVE the entire list of customers
  const loadRooms = async () => {
    const response = await fetch('/rooms');
    const rooms = await response.json();
    setRooms(rooms);
  };

  //UPDATE room by id
  const onEditRoom = async (room) => {
    redirect('/updateRoom', {state: {room}});
  };

  //DELETE customer by id
  const onDeleteRoom = async (_id) => {
    const response = await fetch(`/rooms/${_id}`, {method: 'DELETE'});
    if (response.status === 200) {
      const getResponse = await fetch('/rooms');
      const rooms = await getResponse.json();
      setRooms(rooms);
    } else {
      console.error(
        `There was an error and the Room could not be deleted from your database. = ${_id}, status code = ${response.status}`,
      );
    }
  };

  // LOAD all Rooms
  useEffect(() => {
    loadRooms();
  }, []);

  // DISPLAY Rooms
  return (
    <section className="content-area">
      <h2>Rooms</h2>
      <p id="addRoomBtn">
        <Link to="/createRoom">
          <FaPlusCircle />
          Add Room
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

export default RoomPage;
