const PetReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };

    case "PETS":
      return {
        ...state,
        isLoading: false,
        pets: action.payload,
      };

    case "API_ERROR":
      return { ...state, isLoading: false, isError: true };
    case "SET_SINGLE_LOADING":
      return { ...state, isSingleLoading: true };

    case "SET_SINGLE_PET":
      return {
        ...state,
        isSingleLoading: false,
        singlePet: action.payload,
      };

    case "SET_SINGLE_ERROR":
      return { ...state, isSingleLoading: false, isError: true };

    default:
      return state;
  }
};

export default PetReducer;
