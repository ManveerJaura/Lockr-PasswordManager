require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Password = require('./models/password');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Connection error', err));

// Routes
app.get('/', async (req, res) => {
  try {
    const passwords = await Password.find();
    res.status(200).json(passwords);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/', async (req, res) => {
  const { site, username, password, id } = req.body;

  if (!site || !username || !password || !id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newPassword = new Password({ site, username, password, id });
    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save password' });
  }
});

app.delete('/', async (req, res) => {
  const { id } = req.body; // Extract the "id" field from the request body

  // Validate the ID
  if (!id) {
    return res.status(400).json({ error: 'Password ID is required' });
  }

  try {
    // Delete the password document where "id" matches
    const deletedPassword = await Password.findOneAndDelete({ id });

    if (!deletedPassword) {
      return res.status(404).json({ error: 'Password not found' });
    }

    res.status(200).json({ message: 'Password deleted successfully', data: deletedPassword });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete password', details: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
