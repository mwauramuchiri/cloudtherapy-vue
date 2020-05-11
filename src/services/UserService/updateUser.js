import axios from "axios";

import { BASE_API_URL } from "../../constants";

import { userStore } from "../../stores";

let userId;

/** Update user */
const updateUser = updateData => {
  const _requestUrl = `${BASE_API_URL}/user/${userId}`;
  const _requestData = {
    data: updateData
  };

  return axios.patch(_requestUrl, _requestData);
};

// Get user id from user store
userStore.subscribe(user => {
  userId = user.uid;
});

//* EXPORTS
export default updateUser;
