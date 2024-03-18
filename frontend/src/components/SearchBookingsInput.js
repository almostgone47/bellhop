import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import _ from 'lodash';

import {useBooking} from '../hooks/useBookingModal';

const SearchBookingsInput = () => {
  const [searchBookings, setSearchBookings] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const {setBookingId, setIsModalOpen} = useBooking();

  const openModal = (bookingId) => {
    setBookingId(bookingId);
    setIsModalOpen(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnSearch = useCallback(
    _.debounce((query) => {
      onSearch(query);
    }, 1000),
    [],
  );

  useEffect(() => {
    if (searchBookings.length >= 3) {
      debouncedOnSearch(searchBookings);
    }
    if (searchBookings === '') {
      setSearchResults([]);
    }
  }, [searchBookings, debouncedOnSearch]);

  const onSearch = async (query) => {
    try {
      const res = await axios.get('/customers/search', {
        params: {query},
      });
      setSearchResults(res.data);
    } catch (error) {
      console.log('Error:', error);
      //   setResults([]);
    }
  };

  const handleSelectResult = (selectedResult) => {
    console.log('selectedResult: ', selectedResult);
    openModal(selectedResult.booking_id);
    setSearchResults([]);
  };

  return (
    <>
      <input
        type="text"
        value={searchBookings}
        onChange={(e) => setSearchBookings(e.target.value)}
        placeholder="Search bookings..."
      />
      {searchResults.length > 0 && (
        <ul id="searchDropDown">
          {searchResults.map((result, index) => (
            <li
              key={index}
              style={{cursor: 'pointer'}}
              onClick={() => handleSelectResult(result)}
            >
              {new Date(result.start_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}{' '}
              - {result.first_name} {result.last_name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchBookingsInput;
