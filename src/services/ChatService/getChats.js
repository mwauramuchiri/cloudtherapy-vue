import store from "../../store";

// Utils
import { db } from "../../utils/firebase";
import { getOtherUser } from "../../utils/chat";

const _chatsRef = db.collection("chats");

/** Get chat threads belonging to the currently logged in user
 * Currently logged in user is retrieved from Auth store
 */
const getChats = async () => {
  const userId = store.state.userStore.user.uid;
  store.commit("chatStore/updateProp", {
    name: "isLoadingChat",
    value: true
  });

  if (!userId) return [];

  // Sets up realtime listener for chat
  return _chatsRef
    .where("participantIds", "array-contains", userId)
    .where("isActive","==",true)
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

      // Update the chat store
      store.commit("chatStore/updateProp", {
        name: "chats",
        value: chats
      });

      store.commit("chatStore/updateProp", {
        name: "isLoadingChat",
        value: false
      });
    });
};

//* EXPORTS
export default getChats;
