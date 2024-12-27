const initialState = { data: {}, tab:'prod_ongoing' };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_PRODUCT': {
      return {
        ...state,
        data: action.data
      };
    }
    case 'RETURN_TAB': {
      return {
        ...state,
        tab: action.tab
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default reducer;
