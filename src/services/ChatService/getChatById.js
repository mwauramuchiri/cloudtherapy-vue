import { collection, doc, getDoc } from "firebase/firestore";
// Firebase
import { db } from "../../utils/firebase";

// Utils
import { getCurrentUser, getOtherUser } from "../../utils/chat";

// Stores
import store from "../../store";

const getChatById = chatId => {
  getDoc(doc(collection(db, "chats"), chatId))
    .then(chatDoc => {
      const chatFound = chatDoc.data();

      let currentChat = chatFound || {};
      currentChat.chatId = chatId;
      currentChat.currentUser = getCurrentUser(chatFound);
      currentChat.otherUser = getOtherUser(chatFound);

      // Update store value of chat found
      store.commit("chatStore/updateProp", {
        name: "currentChat",
        value: currentChat
      });
    });
};

//* EXPORTS
export default getChatById;
