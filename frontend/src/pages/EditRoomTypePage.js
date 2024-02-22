import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const AddRoomTypePageTable = () => {
  const [roomType, setRoomType] = useState({
    name: '',
    price: '',
    capacity: '',
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setRoomType({...roomType, [name]: value});
  };

  const addRoomType = async () => {
    try {
      const response = await fetch('/roomTypes', {
        method: 'POST',
        body: JSON.stringify(roomType),
        headers: {'Content-Type': 'application/json'},
      });

      if (response.ok) {
        alert('Room Type successfully added!');
        navigate('/roomTypes');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add room type');
      }
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
          placeholder="Capacity"
          name="capacity"
          value={roomType.capacity}
          onChange={changeHandler}
        />
        <button onClick={addRoomType}>Submit Room Type</button>
      </div>
    </section>
  );
};

export default AddRoomTypePageTable;
