import axios from "axios";
import { API, BASE_URL } from "@commons/config";
import {
  fetchBusinessRequest,
  fetchBusinessSuccess,
  fetchBusinessFailure,
} from "@redux";
import store from "@redux/store";

export default function fetchBusinessList() {
  const state = store.getState()
  const jwtToken = state.auth.token

  store.dispatch(fetchBusinessRequest());
  store.dispatch(fetchBusinessSuccess([
    {
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
    {
      id: 2,
      location: {
        latitude: 38.4242986,
        longitude: 27.1909385,
      },
      name: "market 2",
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
    {
      id: 3,
      location: {
        latitude: 38.4232986,
        longitude: 27.1939385,
      },
      name: "market 3",
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
    }
  ]));

  // axios
  //   .get(BASE_URL + API.GET_BUSINESS_LIST, {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //   })
  //   .then((res) => {
  //     var businessList = []
  //     res.data.map((business) => businessList.push(business));
  //     store.dispatch(fetchBusinessSuccess(businessList));
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     if (error.response !== undefined) {
  //       store.dispatch(fetchBusinessFailure(error.response.statusText));
  //     } else {
  //       store.dispatch(fetchBusinessFailure(error.message));
  //     }
  //   });
}
