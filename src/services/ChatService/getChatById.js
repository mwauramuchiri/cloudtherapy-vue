// Firebase
import { db } from "../../utils/firebase";

// Utils
import ChatUtils from "../../utils/chat";

// Stores
import { chatStore } from "../../stores";

const getChatById = chatId => {
  db.collection("chats")
    .doc(chatId)
    .get()
    .then(chatDoc => {
      const chatFound = chatDoc.data();

      // Update store value of chat found
      chatStore.update(storeVal => {
        storeVal.currentChat = chatFound;
        storeVal.currentChat.chatId = chatId;
        //? Assumes chat happens between 2 people
        storeVal.currentChat.currentUser = ChatUtils.getCurrentUser(
          storeVal.currentChat
        );
        storeVal.currentChat.otherUser = ChatUtils.getOtherUser(
          storeVal.currentChat
        );

        return storeVal;
      });
    });
};

//* EXPORTS
export default getChatById;
