import axios from "axios";
import { API, BASE_URL } from "@commons/config";
import {
  putMessageRequest,
  putMessageSuccess,
  putMessageError,
} from "@redux";
import store from "@redux/store";

export default function putMessage(message) {
  const state = store.getState()
  const jwtToken = state.auth.token

  store.dispatch(putMessageRequest());
  store.dispatch(putMessageSuccess(message));

  // axios
  //   .get(BASE_URL + API.GET_CHAT_LIST, {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //   })
  //   .then((res) => {
  //     var chatList = []
  //     res.data.map((chat) => chatList.push(chat));
  //     store.dispatch(putMessageSuccess(chatList));
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     if (error.response !== undefined) {
  //       store.dispatch(putMessageError(error.response.statusText));
  //     } else {
  //       store.dispatch(putMessageError(error.message));
  //     }
  //   });
}
