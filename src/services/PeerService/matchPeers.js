import axios from "axios";

import { BASE_API_URL } from "../../constants";

import store from "../../store";

/** Find matches for the currently logged in peer */
const matchPeers = async () => {
  const userId = store.state.user.user.uid;
  const _requestUrl = `${BASE_API_URL}/peer/match/${userId}`;

  return axios.post(_requestUrl);
};

//* EXPORTS
export default matchPeers;
