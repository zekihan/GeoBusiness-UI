import {
  FETCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_SUCCESS,
  FETCH_BUSINESS_FAILURE,
} from "./businessActionTypes.js";

const initialState = {
  businessList: [],
  businessListLoading: false,
  businessListError: "",
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
    default:
      return state;
  }
};

export default businessReducer;
