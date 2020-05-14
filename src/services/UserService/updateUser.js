import axios from "axios";

import { BASE_API_URL } from "../../constants";

import store from "../../store";

/** Update user */
const updateUser = function(updateData) {
  let user = store.state.userStore.user;
  let userId = user.uid;

  const _requestUrl = `${BASE_API_URL}/user/${userId}`;
  const _requestData = {
    data: updateData
  };

  return axios.patch(_requestUrl, _requestData).then(() => {
    updateData.isNew = false;

    store.commit("userStore/updateProp", {
      name: "user",
      value: { ...user, ...updateData }
    });
  });
};

//* EXPORTS
export default updateUser;
