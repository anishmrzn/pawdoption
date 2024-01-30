const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
      };
    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.fliters,
          [name]: value,
        },
      };
    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];
      const { text, category, animalCategory, all } = state.filters;
      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElm) => {
          return curElm.productName.toLowerCase().includes(text);
        });
      }

      if (category) {
        tempFilterProduct = tempFilterProduct.filter((curElm) => {
          return curElm.category === category;
        });
      }
      if (animalCategory) {
        tempFilterProduct = tempFilterProduct.filter((curElm) => {
          return curElm.animalCategory === animalCategory;
        });
      }
      if (all) {
        return { state };
      }
      return {
        ...state,
        filter_products: tempFilterProduct,
      };
    default:
      return state;
  }
};
export default filterReducer;
