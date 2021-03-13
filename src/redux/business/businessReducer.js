import {
  FETCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_SUCCESS,
  FETCH_BUSINESS_FAILURE,
  SET_SELECTED_BUSINESS
} from "./businessActionTypes.js";

const initialState = {
  businessList: [],
  businessListLoading: false,
  businessListError: "",

  selectedBusiness: null,
};

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUSINESS_REQUEST:
      return {
        ...state,
        businessListLoading: true,
      };
    case FETCH_BUSINESS_SUCCESS:
      return {
        ...state,
        businessList: action.payload,
        businessListLoading: false,
        businessListError: "",
      };
    case FETCH_BUSINESS_FAILURE:
      return {
        ...state,
        businessList: [],
        businessListLoading: false,
        businessListError: action.payload,
      };

    case SET_SELECTED_BUSINESS:
      return {
        ...state,
        selectedBusiness: action.payload,
      };
    default:
      return state;
  }
};

export default businessReducer;
