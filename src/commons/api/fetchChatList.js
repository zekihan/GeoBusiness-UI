import axios from "axios";
import { API, BASE_URL } from "@commons/config";
import {
  fetchChatRequest,
  fetchChatSuccess,
  fetchChatFailure,
} from "@redux";
import store from "@redux/store";

export default function fetchChatList() {
  const state = store.getState()
  const jwtToken = state.auth.token

  store.dispatch(fetchChatRequest());
  store.dispatch(fetchChatSuccess([
    {
      consumer: state.auth.user,
      business: {
        id: 1,
        location: {
          latitude: 38.4222986,
          longitude: 27.1909385,
        },
        name: "market market market market market market market market market market market market market market ",
        photo: "https://cdn0.iconfinder.com/data/icons/leto-ui-generic-2/64/leto_ui_2-01-512.png",
        category: "Market",
        email: "market1@email.com",
        phone: "1223132132123",
        img: null,
        authorizedPerson: "Ahmet",
        minOrderCost: 50,
        maxServiceRange: 15,
        products:
          [
            {
              category: "meyve",
              items: ["elma", "armut"]
            },
            {
              category: "kuru bakliyat",
              items: ["pilav", "makarna"]
            }
          ],
        rate: 3.2
      },
      messages: [

      ]
    }
  ]));

  // axios
  //   .get(BASE_URL + API.GET_CHAT_LIST, {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //   })
  //   .then((res) => {
  //     var chatList = []
  //     res.data.map((chat) => chatList.push(chat));
  //     store.dispatch(fetchChatSuccess(chatList));
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     if (error.response !== undefined) {
  //       store.dispatch(fetchChatFailure(error.response.statusText));
  //     } else {
  //       store.dispatch(fetchChatFailure(error.message));
  //     }
  //   });
}
