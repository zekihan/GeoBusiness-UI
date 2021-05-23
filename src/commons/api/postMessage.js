import axios from "axios";
import { API, BASE_URL } from "@commons/config";
import {
  postMessageRequest,
  postMessageSuccess,
  postMessageError,
} from "@redux";
import store from "@redux/store";

export default function postMessage(message) {
  const state = store.getState()
  const jwtToken = state.auth.token

  store.dispatch(postMessageRequest());
  store.dispatch(postMessageSuccess(message));

  // axios
  //   .get(BASE_URL + API.GET_CHAT_LIST, {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //   })
  //   .then((res) => {
  //     var chatList = []
  //     res.data.map((chat) => chatList.push(chat));
  //     store.dispatch(postMessageSuccess(chatList));
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     if (error.response !== undefined) {
  //       store.dispatch(postMessageError(error.response.statusText));
  //     } else {
  //       store.dispatch(postMessageError(error.message));
  //     }
  //   });
}
