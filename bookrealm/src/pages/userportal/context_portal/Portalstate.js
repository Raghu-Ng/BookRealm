import React, { useContext, useState, useEffect } from 'react';
import portalcontext from './portalcontext';
import { userContext } from '../../../App';
import axios from 'axios';
import { UserPortal } from '../UserPortal';

export const Portalstate = (props) => {
  const host = "https://bookrealm.onrender.com";
  const [userData, setUserData] = useState(null);
  const authenticateUser = useContext(userContext);

  useEffect(() => {
    getDetails();
  }, [authenticateUser.uid]); // Fetch data whenever authenticateUser.uid changes

  const getDetails = async () => {
    try {
      const response = await axios.get(`${host}/user/id/${authenticateUser.uid}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <portalcontext.Provider value={{ userData }}>
      {props.children}
      <UserPortal />
    </portalcontext.Provider>
  );
}
