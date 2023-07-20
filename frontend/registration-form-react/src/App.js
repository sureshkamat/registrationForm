import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RegistrationForm from './Components/RegistrationForm';
import UserInfo from './Components/UserInfo';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Registration Form</Link>
            </li>
            <li>
              <Link to="/user-info">User Information</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/user-info" element={<UserInfo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
