import axios from "axios";

import { BASE_API_URL } from "../../constants";

import { userStore } from "../../stores";

let userId;

/** Find matches for the currently logged in peer */
const matchPeers = async () => {
  const _requestUrl = `${BASE_API_URL}/peer/match/${userId}`;

  return axios.post(_requestUrl);
};

userStore.subscribe(user => {
  userId = user.uid;
});

//* EXPORTS
export default matchPeers;
