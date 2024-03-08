import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

const SearchBookingsInput = () => {
  const redirect = useNavigate();
  const [searchBookings, setSearchBookings] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State to store search results

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
    redirect('/updateBooking');
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
