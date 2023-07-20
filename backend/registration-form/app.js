const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// getting-started.js




main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/UserData');
  console.log("coneected dbas");
}
const userSchema = new Schema({
  firstName: String, 
  lastName: String,
  email: String,
  country: String,
  state: String,
  city: String,
  gender: String,
  dateofbirth: String
});

const countrySchema = new Schema({
  country: String
});

const User = mongoose.model('User', userSchema);
const Country = mongoose.model('Country', countrySchema);


app.get('/api/countries', async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch countries' });
  }
});

app.post('/api/registration', async (req, res) => {
  const { firstName, lastName, email, country, state, city, gender, dateofbirth } = req.body;

  try {
     const user = new User({ firstName, lastName, email, country, state, city, gender, dateofbirth });
     await user.save();
    res.json({ message: 'Registration successful!' });
  } catch (err) {
    console.error('Registration failed!', err);
    res.status(500).json({ message: 'Registration failed!' });
  }
});

app.get('/api/user', async (req, res) => {
  try {
    const userData = await User.find();
    res.json(userData);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
