import { userStore, chatStore } from "../../stores";

import { db } from "../../utils/firebase";

let userId = null;
const _chatsRef = db.collection("chats");

/** Get chat threads belonging to the currently logged in user
 * Currently logged in user is retrieved from Auth store
 */
const getChats = async () => {
  if (!userId) return [];

  chatStore.update(storeVal => {
    storeVal.isLoading = true;
    return storeVal;
  });

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

      // Update the chat store
      chatStore.update(storeVal => {
        storeVal.chats = chats;
        storeVal.isLoading = false;

        return storeVal;
      });
    });
};

//
userStore.subscribe(storeVal => {
  userId = storeVal.uid;
  getChats();
});

//* EXPORTS
export default getChats;
