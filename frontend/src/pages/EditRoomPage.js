import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditRoomPage = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [room, setRoom] = useState({
    roomTypeId: '',
    roomNumber: '',
  });

  useEffect(() => {
    if (!state?.room) {
      toast.error('Room data not found.');
      navigate('/settings/rooms');
    } else {
      setRoom({
        roomTypeId: state.room.room_type_id,
        roomNumber: state.room.room_number,
      });
    }
  }, [state, navigate]);

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setRoom({...room, [name]: value});
  };

  const editRoom = async () => {
    try {
      await axios.put(`/rooms/${state.room.room_id}`, room);
      toast.success('Room updated successfully!');
      navigate('/settings/rooms');
    } catch (error) {
      toast.error(`Failed to update room: ${error.message || error}`);
    }
  };

  return (
    <section className="content-area">
      <h2>Edit Room</h2>
      <div>
        <input
          type="number"
          placeholder="Room Type ID"
          name="roomTypeId"
          value={room.roomTypeId}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="Room Number"
          name="roomNumber"
          value={room.roomNumber}
          onChange={changeHandler}
        />
        <button onClick={editRoom}>Submit Changes</button>
      </div>
    </section>
  );
};

export default EditRoomPage;
