import { doc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";

const _chatMessagesRef = doc(collection(db, "messages"));

/** Get chat messages belonging to a single chat (chat thread)
 * @param {String} chatId The id of the chat thread to retrieve messages for
 * @param {Function} beforeFn Callback invoked before check for messages happens
 * @param {Function} afterFn Callback invoked when check for messages happens
 */
const getChatMessages = async (
  chatId,
  beforeFn = () => {},
  afterFn = () => {}
) => {
  // Only run the before function if it is defined
  if (beforeFn) {
    beforeFn();
  }

  return _chatMessagesRef
    .where("chatId", "==", chatId)
    .orderBy("dateSent", "asc")
    .onSnapshot(async (querySnapshot) => {
      let chatMessages = [];
      querySnapshot.docs.forEach((doc) => {
        let _chatMessage = doc.data();
        _chatMessage.id = doc.id;
        chatMessages.push(_chatMessage);
      });

      afterFn(chatMessages);
    });
};

//* EXPORTS
export default getChatMessages;
