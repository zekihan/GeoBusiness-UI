import axios from "axios";
import { API, BASE_URL } from "@commons/config";
import {
  fetchBusinessRequest,
  fetchBusinessSuccess,
  fetchBusinessFailure,
} from "@redux";
import store from "@redux/store";
import { useSelector } from "react-redux";

export default function fetchBusinessList() {
  const jwtToken = useSelector(state => state.auth.token)

  store.dispatch(fetchBusinessRequest());
  axios
    .get(BASE_URL + API.GET_BUSINESS_LIST, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then((res) => {
      var businessList = []
      res.data.map((business) => businessList.push(business));
      store.dispatch(fetchBusinessSuccess(businessList));
    })
    .catch((error) => {
      console.log(error)
      if (error.response !== undefined) {
        store.dispatch(fetchBusinessFailure(error.response.statusText));
      } else {
        store.dispatch(fetchBusinessFailure(error.message));
      }
    });
}
