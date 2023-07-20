import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dateOfBirth: '',
  });

  const [countries, setCountries] = useState([]);
  const [state, setState] = useState([]);
  const [cities, setCities] = useState([]);

  

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/countries');
      setCountries(response.data);
    } catch (error) {
      console.error('Failed to fetch countries', error);
    }
  };

  const handleCountryChange = async (e) => {
    const selectedCountry = e.target.value;
    setFormData({ ...formData, country: selectedCountry, state: '', city: '' });

    try {
      const Allstates=countries.filter((el)=>el.country==selectedCountry);
      setState(Allstates);
    } catch (error) {
      console.error('Failed to fetch states', error);
    }
  };

  const handleStateChange = async (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: '' });

    try {
      const response =state.map((el)=>el.states.filter((ell)=>ell.state==selectedState));
      setCities(response);
      console.log(response);
      // response.map((el)=>el[0]['cities'].map((ell)=>console.log(ell)))
      response.map((el)=>setCities(el[0]['cities']))
    } catch (error) {
      console.error('Failed to fetch cities', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/registration', formData);
      console.log('Registration successful!', response.data);
      // Redirect to a separate page to display the information
      // You can use React Router or any other method for navigation
    } catch (error) {
      console.error('Registration failed!', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          pattern="[A-Za-z]+"
          required
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          pattern="[A-Za-z]+"
          required
        />
      </div>
      <div>
        <label>E-Mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Country</label>
        <select name="country" value={formData.country} onChange={handleCountryChange} required>
          <option value="">Select a country</option>
          {countries.map((el) => (
            <option key={el.country} value={el.country}>
              {el.country}
            </option>
          ))}
        </select>

      </div>
      <div>
        <label>State</label>
        <select name="state" value={formData.state} onChange={handleStateChange} required>
          <option value="">Select a state</option>
          {
            state.map((el,i) => (
            el.states.map((ell,i)=>(
              <option key={i} value={ell.state}>
              {ell.state}
            </option>
            ))
          ))}
        </select>
      </div>
      <div>
        <label>City</label>
        <select name="city" value={formData.city} onChange={handleChange} required>
          <option value="">Select a city</option>
          {
            cities.map((ell,i)=>(
              <option key={i} value={ell}>
              {ell}
            </option>
            ))
          }
        </select>
      </div>
      <div>
        <label>Gender</label>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              required
            />{' '}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              required
            />{' '}
            Female
          </label>
        </div>
      </div>
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          name="dateofbirth"
          value={formData.dateofbirth}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default RegistrationForm;
