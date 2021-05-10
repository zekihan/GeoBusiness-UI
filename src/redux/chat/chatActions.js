import {
  SET_SELECTED_CHAT
} from "./chatActionTypes.js";

export const setSelectedChat = (chat) => {
  return {
    type: SET_SELECTED_CHAT,
    payload: chat,
  };
};
