import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserInfo = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user');
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  return (
    <div>
      <h2 >User Information</h2>
      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)",gap:"20px",margin:"10px"}}>
        {userData.map((user) => (
          <div key={user._id} style={{border:"1px solid",padding:"30px"}}>
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Country:</strong> {user.country}
            </p>
            <p>
              <strong>State:</strong> {user.state}
            </p>
            <p>
              <strong>City:</strong> {user.city}
            </p>
            <p>
              <strong>DOB:</strong> {user.dateofbirth}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
