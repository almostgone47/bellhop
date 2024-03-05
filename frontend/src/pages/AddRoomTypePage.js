import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddRoomTypePageTable = () => {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState({
    name: '',
    price: '',
    capacity: '',
  });

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setRoomType({...roomType, [name]: value});
  };

  const addRoomType = async () => {
    try {
      await axios.post('/roomTypes', {roomType});
      toast.success('Room Type successfully added!');
      navigate('/settings/roomTypes');
    } catch (error) {
      alert(`Failed to add room type. ${error.message}`);
    }
  };

  return (
    <section className="content-area">
      <h2>Add a Room Type</h2>
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
          type="number"
          placeholder="Description"
          name="description"
          value={roomType.description}
          onChange={changeHandler}
        />
        <button onClick={addRoomType}>Submit Room Type</button>
      </div>
    </section>
  );
};

export default AddRoomTypePageTable;
