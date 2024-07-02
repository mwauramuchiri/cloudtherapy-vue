import axios from "axios";

import { BASE_API_URL } from "../../constants";

/** Authenticate user ~ store their information in that database
 * @param {String} uid The id of the user provided by firebase
 * @param {Object} userData An object representing the current user's data
 */
const authUser = async (uid, userData) => {
  const requestData = {
    data: {
      uid,
      user: userData
    }
  };

  return axios.post(`${BASE_API_URL}/auth`, requestData);
};

export default authUser;
