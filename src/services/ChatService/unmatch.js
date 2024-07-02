import axios from "axios";

import { BASE_API_URL } from "../../constants";

/** Find matches for the currently logged in peer */
const unmatch = async (chatId) => {
  const _requestData = {
    data: {
      chatId
    }
  };

  const _requestUrl = `${BASE_API_URL}/chat/unmatch`;

  return axios.post(_requestUrl, _requestData);
};

//* EXPORTS
export default unmatch;
