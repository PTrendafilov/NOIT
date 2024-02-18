const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const db = 'mongodb+srv://plamenltrendafilov:<password>@gpsprotection.rt4xrlb.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// API Endpoint to handle signup data
app.post('/signup', (req, res) => {
  console.error('SERVER.JS TEXT Message'); // This message will now be logged
  // Process signup data here
  // ...
  res.json({ message: 'Signup successful!' }); // Example response
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
