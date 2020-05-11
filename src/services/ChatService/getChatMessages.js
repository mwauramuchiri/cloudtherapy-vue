import { db } from "../../utils/firebase";

import { chatStore } from "../../stores";

const _chatMessagesRef = db.collection("messages");

/** Get chat messages belonging to a single chat (chat thread)
 * @param {String} chatId The id of the chat thread to retrieve messages for
 */
const getChatMessages = async chatId => {
  chatStore.update(storeVal => {
    storeVal.isLoading = true;
    return storeVal;
  });

  return _chatMessagesRef
    .where("chatId", "==", chatId)
    .orderBy("dateSent", "desc")
    .onSnapshot(async querySnapshot => {
      let chatMessages = [];
      querySnapshot.docs.forEach(doc => {
        let _chatMessage = doc.data();
        _chatMessage.id = doc.id;
        chatMessages.push(_chatMessage);
      });

      // Update the store
      chatStore.update(storeVal => {
        storeVal.messages = chatMessages;
        storeVal.isLoading = false;
        return storeVal;
      });
    });
};

//* EXPORTS
export default getChatMessages;
