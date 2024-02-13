import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/petReducer";
const API = "http://127.0.0.1:8000/api/get-pets/";

const PetContext = createContext();
function PetProvider({ children }) {
  const initialState = {
    isLoading: false,
    isError: false,
    user: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getPet = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      //   , {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      const pets = await res.data;

      dispatch({ type: "PETS", payload: pets });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  useEffect(() => {
    getPet(API);
  }, []);
  return (
    <PetContext.Provider value={{ ...state, getPet }}>
      {children}
    </PetContext.Provider>
  );
}
const usePetContext = () => {
  return useContext(PetContext);
};
export { PetProvider, PetContext, usePetContext };
