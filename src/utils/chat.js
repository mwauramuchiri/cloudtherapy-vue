import {
    userStore
} from '../stores';

let userId;

/** Returns true if message is from the currently logged in user and false if not 
 * @param {Object} chatMessage The message object containing information on who the message is from and who it was going to
 */
const isSelf = (chatMessage) => {
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
    const {
        initiator,
        prospect
    } = chat;

    return initiator.uid === userId ? initiator : prospect;
}

/** Get the other user in a chat */
const getOtherUser = (chat) => {
    if (!_chatIsValid(chat)) return {};

    const {
        initiator,
        prospect
    } = chat;

    return initiator.uid === userId ? prospect : initiator;
};

userStore.subscribe(user => {
    userId = user.uid;
})

export default {
    getCurrentUser,
    getOtherUser,
    isSelf
}