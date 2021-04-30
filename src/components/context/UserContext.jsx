import React, { useState, useContext } from 'react';

const UserContext = React.createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { localStorage } = window;
  const userData = JSON.parse(localStorage.getItem('user'));
  const username = userData ? userData.username : null;
  const [user, setUser] = useState(username);
  const logIn = (name) => setUser(name);
  return (
    <UserContext.Provider value={{
      user,
      logIn,
    }}
    >
      { children }
    </UserContext.Provider>
  );
};
