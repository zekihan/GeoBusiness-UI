import axios from "axios";
import { API, BASE_URL } from "@commons/config";
import {
  putMessageRequest,
  putMessageSuccess,
  putMessageError,
} from "@redux";
import store from "@redux/store";
import postMessage from "@commons/api/postMessage"

export default function putMessage(message) {
  const state = store.getState()
  const jwtToken = state.auth.token
  const businessList = state.business.businessList

  store.dispatch(putMessageRequest());
  store.dispatch(putMessageSuccess(message));
  if (message.isOrder) {
    let asd = businessList.find(b => b.id === message.businessId)
    postMessage({
      _id: "c8743a4a-5160-448c-9f1f-0ce78a423875",
      businessId: 1,
      createdAt: new Date(),
      id: "c8743a4a-5160-448c-9f1f-0ce78a423875",
      text: "my price is: 50",
      isOrder: false,
      user: {
        _id: 1,
        avatar: "https://cdn0.iconfinder.com/data/icons/leto-ui-generic-2/64/leto_ui_2-01-512.png",
        name: asd.name,
      },
      quickReplies: {
        type: 'radio', // 'radio' or 'checkbox',
        values: [
          {
            title: 'Accept',
            value: "completeOrder",
          }
        ],
      }
    });
  }
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
