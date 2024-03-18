import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddRoomTypePageTable = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [roomType, setRoomType] = useState({
    name: '',
    price: '',
    capacity: '',
  });

  useEffect(() => {
    console.log('state: ', state);
    setRoomType({
      name: state.roomType.name,
      price: state.roomType.price,
      description: state.roomType.description,
    });
  }, [state, navigate]);

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setRoomType({...roomType, [name]: value});
  };

  const editRoomType = async () => {
    try {
      await axios.put(`/roomTypes/${state.roomType.room_type_id}`, roomType);
      toast.success('Room Type successfully updated!');
      navigate('/settings/roomTypes');
    } catch (error) {
      toast.error(`Failed to add room type. ${error.message}`);
    }
  };

  return (
    <section className="content-area">
      <h2>Update a Room Type</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={roomType.name}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="Price"
          name="price"
          value={roomType.price}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={roomType.description}
          onChange={changeHandler}
        />
        <button onClick={editRoomType}>Save Changes</button>
      </div>
    </section>
  );
};

export default AddRoomTypePageTable;
