import { doc, collection } from "firebase/firestore";
// Utils
import { db } from "../../utils/firebase";
import { getOtherUser } from "../../utils/chat";

const _chatsRef = doc(collection(db, "chats"));

/** Get chat threads belonging to the currently logged in user
 * Currently logged in user is retrieved from Auth store
 */
const getChats = async (userId, beforeFn = () => {}, afterFn = () => {}) => {
  // Only run the before function if it is defined
  if (beforeFn) {
    beforeFn();
  }

  if (!userId) return [];

  // Sets up realtime listener for chat
  return _chatsRef
    .where("participantIds", "array-contains", userId)
    .orderBy("dateUpdated", "desc")
    .onSnapshot(async querySnapshot => {
      let chats = [];
      let chatItem;
      querySnapshot.docs.forEach(doc => {
        chatItem = doc.data();
        chatItem.id = doc.id;
        chats.push(chatItem);
      });

      chats = chats.map(chat => {
        chat.otherUser = getOtherUser(chat);
        return chat;
      });

      afterFn(chats);
    });
};

//* EXPORTS
export default getChats;
