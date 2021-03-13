import {
  FETCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_SUCCESS,
  FETCH_BUSINESS_FAILURE,
  SET_SELECTED_BUSINESS,
} from "./businessActionTypes.js";

export const fetchBusinessRequest = () => {
  return {
    type: FETCH_BUSINESS_REQUEST,
  };
};
export const fetchBusinessSuccess = (businessList) => {
  return {
    type: FETCH_BUSINESS_SUCCESS,
    payload: businessList,
  };
};
export const fetchBusinessFailure = (error) => {
  return {
    type: FETCH_BUSINESS_FAILURE,
    payload: error,
  };
};

export const setSelectedBusiness = (business) => {
  return {
    type: SET_SELECTED_BUSINESS,
    payload: business,
  };
};
