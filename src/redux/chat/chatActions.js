import {
  SET_SELECTED_CHAT,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,

  POST_MESSAGE_REQUEST,
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_ERROR,

  PUT_MESSAGE_REQUEST,
  PUT_MESSAGE_SUCCESS,
  PUT_MESSAGE_ERROR,
} from "./chatActionTypes.js";

export const setSelectedChat = (chat) => {
  return {
    type: SET_SELECTED_CHAT,
    payload: chat,
  };
};

export const fetchChatRequest = () => {
  return {
    type: FETCH_CHAT_REQUEST,
  };
};
export const fetchChatSuccess = (chatList) => {
  return {
    type: FETCH_CHAT_SUCCESS,
    payload: chatList,
  };
};
export const fetchChatFailure = (error) => {
  return {
    type: FETCH_CHAT_FAILURE,
    payload: error,
  };
};

export const postMessageRequest = () => {
  return {
    type: POST_MESSAGE_REQUEST,
  };
};
export const postMessageSuccess = (chatList) => {
  return {
    type: POST_MESSAGE_SUCCESS,
    payload: chatList,
  };
};
export const postMessageError = (error) => {
  return {
    type: POST_MESSAGE_ERROR,
    payload: error,
  };
};

export const putMessageRequest = () => {
  return {
    type: PUT_MESSAGE_REQUEST,
  };
};
export const putMessageSuccess = (chatList) => {
  return {
    type: PUT_MESSAGE_SUCCESS,
    payload: chatList,
  };
};
export const putMessageError = (error) => {
  return {
    type: PUT_MESSAGE_ERROR,
    payload: error,
  };
};