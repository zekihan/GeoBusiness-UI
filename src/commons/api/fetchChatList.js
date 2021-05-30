import axios from "axios";
import { API, BASE_URL } from "@commons/config";
import {
  fetchChatRequest,
  fetchChatSuccess,
  fetchChatFailure,
} from "@redux";
import store from "@redux/store";
import storePng from '../../../assets/store.png';

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
        name: "Valley Market",
        photo: "https://img-premium.flaticon.com/png/512/123/123403.png?token=exp=1621971607~hmac=4d663fb5f6aad537fa8ad062faf815b9",
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
        {
          _id: "c8743a4a-5160-448c-9f1f-0be78a423875",
          businessId: 1,
          createdAt: "2021-05-23T15:59:39.919Z",
          id: "c8743a4a-5160-448c-9f1f-0be78a423875",
          text: "my price is: 50",
          isOrder: false,
          user: {
            _id: 1,
            avatar: "https://cdn0.iconfinder.com/data/icons/leto-ui-generic-2/64/leto_ui_2-01-512.png",
            name: "market market market market market market market market market market market market market market ",
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
        },
        {
          _id: "c8743a4a-5160-448c-9f1f-0be78a423873",
          businessId: 1,
          createdAt: "2021-05-23T15:58:39.919Z",
          id: "c8743a4a-5160-448c-9f1f-0be78a423873",
          text: "Can i get a kilo of yoghurt?",
          isOrder: true,
          user: {
            _id: "auth0|60aa48f7a0a7ac0071bce688",
            aud: "0RkrbD08xD6Bi1DuGrWPKSsDdlpiF1VU",
            avatar: undefined,
            exp: 1624364536,
            iat: 1621772536,
            iss: "https://geobusiness.eu.auth0.com/",
            name: "testuser1@gmail.com",
            nickname: "testuser1",
            nonce: "nonce",
            picture: "https://s.gravatar.com/avatar/e89296b53b13ae2313c2879824d15c27?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            sub: "auth0|60aa48f7a0a7ac0071bce688",
            updated_at: "2021-05-23T12:22:15.950Z",
          },
        },
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
