import axios from "axios";

import { CHAT_API_URL } from "../../constants";

/** Send a message to the `chat` of `chatId` as the currently logged in user
 * @param {String} chatId The id of the chat thread to send a message to
 */
const sendMessage = async (chatId, messageData) => {
  const _requestUrl = `${CHAT_API_URL}/chat/message`;

  // Send chatId as part of the messageData when creating a message
  messageData.chatId = chatId;

  const requestData = {
    data: messageData
  };

  const apiResponse = axios.post(_requestUrl, requestData);
  return apiResponse;
};

//* EXPORTS
export default sendMessage;
