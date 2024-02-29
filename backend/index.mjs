import 'dotenv/config';
import express from 'express';

import bookings from './controllers/bookings.mjs';
import roomBookings from './controllers/roomBookings.mjs';
import customers from './controllers/customers.mjs';
import roomTypes from './controllers/roomTypes.mjs';
import rooms from './controllers/rooms.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use(express.static('../frontend/build'));

app.use('/bookings', bookings);
app.use('/roomBookings', roomBookings);
app.use('/customers', customers);
app.use('/roomTypes', roomTypes);
app.use('/rooms', rooms);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
