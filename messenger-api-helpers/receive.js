/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MODULES ===============================================================
import sendApi from './send';

// ===== STORES ================================================================
import UserStore from '../stores/user-store';

// Updates a users preferred gift, then notifies them of the change.
const handleNewGiftSelected = (senderId, giftId) => {
  const user = UserStore.get(senderId);
  user.setPreferedGift(giftId);
  sendApi.sendGiftChangedMessage(senderId);
};

const getUser = (senderId) => {
  const user = UserStore.get(senderId);

  if (!user) {
    const user = UserStore.insert({
      id: senderId,
      isTalkingToMatch: false
    });
  }

  return user;
};

const handleFindAMatch = (senderId) => {
  const user = getUser(senderId);

  //get a match
  const otherUser = UserStore.getAnyOther(senderId);
  console.log('my user', senderId);
  
  if (!otherUser) {
    console.log('No other user found');
    //send message, looking for a match
    return false;
  }
  else {
    console.log('User found', otherUser);

    //set a match
    user.setMatch(otherUser.id);
    otherUser.setMatch(user.id);

    //send message to both
    sendApi.sendWelcomeMessage(user.id);
    sendApi.sendWelcomeMessage(otherUser.id);
    
    return true;
  }
};

/*
 * handleReceivePostback — Postback event handler triggered by a postback
 * action you, the developer, specify on a button in a template. Read more at:
 * developers.facebook.com/docs/messenger-platform/webhook-reference/postback
 */
const handleReceivePostback = (event) => {
  /**
   * The 'payload' parameter is a developer-defined field which is
   * set in a postbackbutton for Structured Messages.
   *
   * In this case we've defined our payload in our postback
   * actions to be a string that represents a JSON object
   * containing `type` and `data` properties. EG:
   */
  const {type, data} = JSON.parse(event.postback.payload);
  const senderId = event.sender.id;

  // perform an action based on the type of payload received
  switch (type) {
  case 'CHANGE_GIFT':
    sendApi.sendChooseGiftMessage(senderId);
    break;
  case 'CHOOSE_GIFT':
    handleNewGiftSelected(senderId, data.giftId);
    break;
  case 'GET_STARTED':
    //save user as initialized
    sendApi.sendHelloRewardMessage(senderId);
    break;
  default:
    console.error(`Unknown Postback called: ${type}`);
    break;
  }
};

/*
 * handleReceiveMessage - Message Event called when a message is sent to
 * your page. The 'message' object format can vary depending on the kind
 * of message that was received. Read more at: https://developers.facebook.com/
 * docs/messenger-platform/webhook-reference/message-received
 */
const handleReceiveMessage = (event) => {
  const message = event.message;
  const senderId = event.sender.id;

  console.log('message', message);

  // It's good practice to send the user a read receipt so they know
  // the bot has seen the message. This can prevent a user
  // spamming the bot if the requests take some time to return.
  sendApi.sendReadReceipt(senderId);

  if (message.text && message.text == 'Match') {
    handleFindAMatch(senderId);
  }

  // if (message.text) { sendApi.sendWelcomeMessage(senderId); }
};

export default {
  handleReceivePostback,
  handleReceiveMessage,
  handleNewGiftSelected,
};
