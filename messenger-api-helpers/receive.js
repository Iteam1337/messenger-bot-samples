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

const getUser = (senderId) => {
  let user = UserStore.get(senderId);

  if (!user) {
    user = UserStore.insert({
      id: senderId,
      isTalkingToMatch: false,
    });
  }

  return user;
};

const handleFindAMatch = (user) => {
  // get a match
  const otherUser = UserStore.getAnyOther(user.senderId);

  if (!otherUser) {
    console.log('No other user found');
    sendApi.sendMessage(user.id, 'Searching for your opposite');

    return false;
  }

  console.log('User found', otherUser);

    // set a match
  user.setMatch(otherUser.id);
  otherUser.setMatch(user.id);

    // send message to both
  sendApi.sendMessage(user.id, 'Wow! You have a match! Please introduce yourself :)');
  sendApi.sendMessage(otherUser.id, 'Wow! You have a match! Please introduce yourself :)');

  return true;
};

const proxyMessage = (user, message) => {
  const otherUser = UserStore.get(user.matchId);

  sendApi.sendMessage(otherUser.id, `Your opposite says: ${  message}`);
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
  case 'GET_STARTED':
    sendApi.sendWelcomeMessage(senderId);
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

  console.log('received message', message.text);

  // It's good practice to send the user a read receipt so they know
  // the bot has seen the message. This can prevent a user
  // spamming the bot if the requests take some time to return.
  sendApi.sendReadReceipt(senderId);

  const user = getUser(senderId);
  if (user.isTalkingToMatch) {
    if (message) {
      // send to the other part
      proxyMessage(user, message.text);
    }
  } else {
    handleFindAMatch(user);
  }

  // if (message.text) { sendApi.sendWelcomeMessage(senderId); }
};

export default {
  handleReceivePostback,
  handleReceiveMessage,
};
