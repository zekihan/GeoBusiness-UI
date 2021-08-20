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
  const businessList = state.business.businessList

  store.dispatch(fetchChatRequest());
  store.dispatch(fetchChatSuccess([
    {
      consumer: state.auth.user,
      business: {
        id: 2,
        location: {
          latitude: 38.4222986,
          longitude: 27.1909385,
        },
        name: "Gencay Bakkal",
        photo: "https://s.gravatar.com/avatar/e89296b53b13ae2313c2879824d15c27?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
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
          _id: "c8743a4a-5160-448c-9f1f-1be78a423875",
          businessId: 2,
          createdAt: new Date(),
          id: "c8743a4a-5160-448c-9f1f-1be78a423875",
          text: "rate",
          user: {
            _id: 2,
            avatar: "https://s.gravatar.com/avatar/e89296b53b13ae2313c2879824d15c27?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            name: "market market market market market market market market market market market market market market ",
          },
          system: true,
        },
        {
          "_id": "c8743a4a-5160-448c-9f1f-0ce78a423875",
          "businessId": 2,
          "createdAt": "2021-06-01T06:44:46.447Z",
          "id": "c8743a4a-5160-448c-9f1f-0ce78a423875",
          "isAccepted": true,
          "isOrder": false,
          "quickReplies": null,
          "text": "my price is: 50",
          "user": {
            "_id": 2,
            "avatar": "https://s.gravatar.com/avatar/e89296b53b13ae2313c2879824d15c27?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            "name": "Gencay Bakkal",
          },
        },
        {
          "_id": "order1b266f9d-df82-403b-a788-010de7c47744",
          "businessId": 2,
          "createdAt": "2021-06-01T06:44:43.309Z",
          "id": "1b266f9d-df82-403b-a788-010de7c47744",
          "isOrder": true,
          "payment": "1",
          "quickReplies": null,
          "service": "1",
          "text": "can i get\nSelf Servicen\nCredit Card\naddress",
          "user": {
            "_id": "auth0|60aa48f7a0a7ac0071bce688",
            "aud": "0RkrbD08xD6Bi1DuGrWPKSsDdlpiF1VU",
            "avatar": undefined,
            "exp": 1624735819,
            "iat": 1622143819,
            "iss": "https://geobusiness.eu.auth0.com/",
            "name": "testuser1@gmail.com",
            "nickname": "testuser1",
            "nonce": "nonce",
            "picture": "https://s.gravatar.com/avatar/e89296b53b13ae2313c2879824d15c27?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            "sub": "auth0|60aa48f7a0a7ac0071bce688",
            "updated_at": "2021-05-23T12:22:15.950Z",
          },
        },
        {
          "_id": "1b266f9d-df82-403b-a788-010de7c47744",
          "businessId": 2,
          "createdAt": "2021-06-01T06:44:43.309Z",
          "id": "1b266f9d-df82-403b-a788-010de7c47744",
          "quickReplies": null,
          "text": "can i get",
          "user": {
            "_id": "auth0|60aa48f7a0a7ac0071bce688",
            "aud": "0RkrbD08xD6Bi1DuGrWPKSsDdlpiF1VU",
            "avatar": undefined,
            "exp": 1624735819,
            "iat": 1622143819,
            "iss": "https://geobusiness.eu.auth0.com/",
            "name": "testuser1@gmail.com",
            "nickname": "testuser1",
            "nonce": "nonce",
            "picture": "https://s.gravatar.com/avatar/e89296b53b13ae2313c2879824d15c27?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            "sub": "auth0|60aa48f7a0a7ac0071bce688",
            "updated_at": "2021-05-23T12:22:15.950Z",
          },
        },
      ]
    },
    {
      consumer: state.auth.user,
      business: {
        id: 1,
        location: {
          latitude: 38.4222986,
          longitude: 27.1909385,
        },
        name: "Nazar Market",
        photo: "https://s.gravatar.com/avatar/e89296b53b13ae2313c2879824d15c27?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
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
