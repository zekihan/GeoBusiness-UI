import axios from "axios";
import { API, BASE_URL } from "@commons/config";
import {
  setUser
} from "@redux";
import store from "@redux/store";

export default function postCustomer(userData) {
  const state = store.getState()
  const jwtToken = state.auth.token
  const user = state.auth.user
  // store.dispatch(fetchBusinessRequest());

  axios
    .post(BASE_URL + API.POST_CUSTOMER, userData)
    .then((res) => {
      store.dispatch(setUser({ ...user, ...userData }))
    })
    .catch((error) => {
      console.log(error)
    });
}
