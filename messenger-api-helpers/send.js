/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== LODASH ================================================================
import castArray from 'lodash/castArray';

// ===== MESSENGER =============================================================
import api from './api';
import receiveApi from './receive';
import messages from './messages';

// Turns typing indicator on.
const typingOn = (recipientId) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_on', // eslint-disable-line camelcase
  };
};

// Turns typing indicator off.
const typingOff = (recipientId) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_off', // eslint-disable-line camelcase
  };
};

// Wraps a message JSON object with recipient information.
const messageToJSON = (recipientId, messagePayload) => {
  return {
    recipient: {
      id: recipientId,
    },
    message: messagePayload,
  };
};

// Send one or more messages using the Send API.
const sendMessageObject = (recipientId, messagePayloads) => {
  const messagePayloadArray = castArray(messagePayloads)
    .map((messagePayload) => messageToJSON(recipientId, messagePayload));

  api.callMessagesAPI([
    typingOn(recipientId),
    ...messagePayloadArray,
    typingOff(recipientId),
  ]);
};

const sendMessage = (recipientId, message) => {
  sendMessageObject(recipientId,  {text: message});
};

// Send a read receipt to indicate the message has been read
const sendReadReceipt = (recipientId) => {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    sender_action: 'mark_seen', // eslint-disable-line camelcase
  };

  api.callMessagesAPI(messageData);
};

const sendAnswerQuestionsMessage = (recipientId, questionsIndex) => {
  sendMessageObject(
    recipientId,
    [
      messages.answerQuestionsButton(recipientId, questionsIndex),
    ]
  );
};

const sendAnsweredQuestionsMessage = (user) => {
  const answeredQuestions = Object.keys(user.answers).length;
  let index;
  if (answeredQuestions < 1) {
    index = 0;
  } else if (answeredQuestions < 5) {
    index = 1;
  } else if (answeredQuestions < 10) {
    index = 2;
  } else if (answeredQuestions < 15) {
    index = 3;
  } else if (answeredQuestions < 22) {
    index = 4;
  }

  if (index < 1) {
    sendAnswerQuestionsMessage(user.id, index);
  } else {
    receiveApi.handleFindAMatch(user.id);
  }
};

export default {
  sendMessage,
  sendReadReceipt,
  sendAnswerQuestionsMessage,
  sendAnsweredQuestionsMessage,
};
