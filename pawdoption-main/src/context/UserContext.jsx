import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/userReducer";
import Loader from "../components/Loader";
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
    // dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = res.data;
      // setUsr(user);
      // console.log(res, "this is jha");
      console.log(user);
      dispatch({ type: "USERS", payload: user });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  const removeUser = () => {
    dispatch({ type: "REMOVE_USER" });
  };
  useEffect(() => {
    getUser(API);
  }, [token]);

  return (
    <UserContext.Provider value={{ ...state, getUser, removeUser }}>
      {state.isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
}
const useUserContext = () => {
  return useContext(UserContext);
};
export { UserProvider, UserContext, useUserContext };
