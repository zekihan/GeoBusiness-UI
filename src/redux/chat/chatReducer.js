import { Message } from "react-native-gifted-chat";
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

const initialState = {
  selectedChat: null,

  chatList: [],
  chatListLoading: false,
  chatListError: false,

  postMessageLoading: false,
  postMessageError: false,

  putMessageLoading: false,
  putMessageError: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CHAT:
      return {
        ...state,
        selectedChat: action.payload,
      };
    case FETCH_CHAT_REQUEST:
      return {
        ...state,
        chatListLoading: true,
      };
    case FETCH_CHAT_SUCCESS:
      return {
        ...state,
        chatList: action.payload,
        chatListLoading: false,
        chatListError: "",
      };
    case FETCH_CHAT_FAILURE:
      return {
        ...state,
        chatList: [],
        chatListLoading: false,
        chatListError: action.payload,
      };
    case POST_MESSAGE_REQUEST:
      return {
        ...state,
        postMessageLoading: true,
      };
    case POST_MESSAGE_SUCCESS:
      let copyOfSelectedChatForPostMessageSuccess = Object.assign({}, state.selectedChat)
      copyOfSelectedChatForPostMessageSuccess.messages = [action.payload, ...copyOfSelectedChatForPostMessageSuccess.messages]
      let copyOfChatListForPostMessageSuccess = Object.assign([], state.chatList)
      copyOfChatListForPostMessageSuccess = copyOfChatListForPostMessageSuccess.filter(chat => chat.business.id !== copyOfSelectedChatForPostMessageSuccess.business.id)
      copyOfChatListForPostMessageSuccess = [copyOfSelectedChatForPostMessageSuccess, ...copyOfChatListForPostMessageSuccess]
      return {
        ...state,
        postMessageLoading: false,
        postMessageError: "",
        selectedChat: copyOfSelectedChatForPostMessageSuccess,
        chatList: copyOfChatListForPostMessageSuccess,
      };
    case POST_MESSAGE_ERROR:
      return {
        ...state,
        postMessageLoading: false,
        postMessageError: action.payload,
      };

    case PUT_MESSAGE_REQUEST:
      return {
        ...state,
        putMessageLoading: true,
      };
    case PUT_MESSAGE_SUCCESS:
      let copyOfSelectedChatForPutMessageSuccess = Object.assign({}, state.selectedChat)
      let copyOfSelectedChatMessageForPutMessageSuccess = copyOfSelectedChatForPutMessageSuccess.messages
      copyOfSelectedChatMessageForPutMessageSuccess = copyOfSelectedChatMessageForPutMessageSuccess.filter(message => message._id !== action.payload.id)
      copyOfSelectedChatMessageForPutMessageSuccess = [action.payload, ...copyOfSelectedChatMessageForPutMessageSuccess]
      copyOfSelectedChatForPutMessageSuccess.messages = copyOfSelectedChatMessageForPutMessageSuccess
      let copyOfChatListForPutMessageSuccess = Object.assign([], state.chatList)
      copyOfChatListForPutMessageSuccess = copyOfChatListForPutMessageSuccess.filter(chat => chat.business.id !== copyOfSelectedChatForPutMessageSuccess.business.id)
      copyOfChatListForPutMessageSuccess = [copyOfSelectedChatForPutMessageSuccess, ...copyOfChatListForPutMessageSuccess]
      return {
        ...state,
        putMessageLoading: false,
        putMessageError: "",
        selectedChat: copyOfSelectedChatForPutMessageSuccess,
        chatList: copyOfChatListForPutMessageSuccess,
      };
    case PUT_MESSAGE_ERROR:
      return {
        ...state,
        putMessageLoading: false,
        putMessageError: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
