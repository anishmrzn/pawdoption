const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };

    case "USERS":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case "API_ERROR":
      return { ...state, isLoading: false, isError: true };

    default:
      return state;
  }
};

export default UserReducer;
