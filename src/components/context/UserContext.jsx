import React, { useState, useContext } from 'react';

const UserContext = React.createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { localStorage } = window;
  const userData = JSON.parse(localStorage.getItem('user'));
  const oldUser = userData ? { username: userData.username } : null;
  const [user, setUser] = useState(oldUser);
  const logIn = ({ username, token }) => {
    localStorage.setItem('user', JSON.stringify({ username, token }));
    setUser({ username });
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  console.log(user);
  return (
    <UserContext.Provider value={{
      user,
      logIn,
      logOut,
    }}
    >
      { children }
    </UserContext.Provider>
  );
};
