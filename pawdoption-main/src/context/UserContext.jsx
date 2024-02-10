import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/userReducer";
const API = "http://127.0.0.1:8000/api/user-profile/";
const token = localStorage.getItem("userToken");

const UserContext = createContext();
function UserProvider({ children }) {
  const initialState = {
    isLoading: false,
    isError: false,
    user: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getUser = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await res.data;

      dispatch({ type: "USERS", payload: user });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  useEffect(() => {
    getUser(API);
  }, []);
  return (
    <UserContext.Provider value={{ ...state, getUser }}>
      {children}
    </UserContext.Provider>
  );
}
const useUserContext = () => {
  return useContext(UserContext);
};
export { UserProvider, UserContext, useUserContext };
