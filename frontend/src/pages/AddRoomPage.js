import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddRoomPage = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    room_type_id: '',
    roomNumber: '',
  });
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = async () => {
    try {
      const res = await axios.get('/roomTypes');
      setRoomTypes(res.data);
    } catch (error) {
      toast.error('Failed to fetch room types.');
    }
  };

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setRoom({...room, [name]: value});
  };

  const addRoom = async () => {
    try {
      await axios.post('/rooms', {room});
      toast.success('Room successfully added!');
      navigate('/settings/rooms');
    } catch (error) {
      toast.error(`Failed to add room. ${error.message}`);
    }
  };

  return (
    <section className="content-area">
      <h2>Add a Room</h2>
      <div>
        <select
          name="room_type_id"
          value={room.room_type_id}
          onChange={changeHandler}
        >
          <option value="">Select Room Type</option>
          {roomTypes.map((type) => (
            <option key={type.room_type_id} value={type.room_type_id}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Room Number"
          name="roomNumber"
          value={room.roomNumber}
          onChange={changeHandler}
        />
        <button onClick={addRoom}>Submit Room</button>
      </div>
    </section>
  );
};

export default AddRoomPage;
