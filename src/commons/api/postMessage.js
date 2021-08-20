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
  const businessList = state.business.businessList

  let url = "http://192.168.254.128:8084/send"
  // if (message.isOrder) {
  //   let asd = businessList.find(b => b.id === message.businessId)
  //   postMessage({
  //     _id: "c8743a4a-5160-448c-9f1f-0ce78a423875",
  //     businessId: 1,
  //     createdAt: new Date(),
  //     id: "c8743a4a-5160-448c-9f1f-0ce78a423875",
  //     text: "my offer is: 50",
  //     isOrder: false,
  //     user: {
  //       _id: 1,
  //       avatar: "https://cdn0.iconfinder.com/data/icons/leto-ui-generic-2/64/leto_ui_2-01-512.png",
  //       name: asd.name,
  //     },
  //     from: user._id,
  //     to: businessId
  //     // quickReplies: {
  //     //   type: 'radio', // 'radio' or 'checkbox',
  //     //   values: [
  //     //     {
  //     //       title: 'Accept',
  //     //       value: "completeOrder",
  //     //     }
  //     //   ],
  //     // }
  //   });
  // }
  axios
    .post(url, message)
    .then((res) => {

    })
    .catch((error) => {
      console.log(error)
    });
}
