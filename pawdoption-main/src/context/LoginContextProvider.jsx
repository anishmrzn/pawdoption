import React, { useState } from "react";

export const LoginContext = React.createContext({
  token: "",
  setToken: (value) => {},
});

const LoginContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  return (
    <LoginContext.Provider value={{ token, setToken }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
