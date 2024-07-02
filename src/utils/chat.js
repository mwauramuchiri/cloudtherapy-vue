import store from '../store';

/** Returns true if message is from the currently logged in user and false if not 
 * @param {Object} chatMessage The message object containing information on who the message is from and who it was going to
 */
const isSelf = (chatMessage) => {
    const userId = store.state.userStore.user.uid;
    const _messageIsFromSelf = chatMessage.from === userId;

    return _messageIsFromSelf;
}

// Check if chat is valid
const _chatIsValid = (chat) => {
    if (!chat) return false;
    else if (!chat.initiator || !chat.prospect) return false;
    else return true;
}

/** Get the current user in a chat. Mitigates need to try getting the user from user store */
const getCurrentUser = (chat) => {
    const userId = store.state.userStore.user.uid;
    const {
        initiator,
        prospect
    } = chat;

    return initiator.uid === userId ? initiator : prospect;
}

/** Get the other user in a chat */
const getOtherUser = (chat) => {
    const userId = store.state.userStore.user.uid;
    if (!_chatIsValid(chat)) return {};

    const {
        initiator,
        prospect
    } = chat;

    return initiator.uid === userId ? prospect : initiator;
};

export {
    getCurrentUser,
    getOtherUser,
    isSelf
}