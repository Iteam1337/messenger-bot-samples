/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable camelcase */
/* eslint-disable max-len */

/*
 * MESSAGES
 *
 * Objects and methods that create objects that represent
 * messages sent to Messenger users.
 */

// ===== STORES ================================================================
// import UserStore from '../stores/user-store';

// ===== UTILS =================================================================

const SERVER_URL = process.env.SERVER_URL;

console.log('SERVER_URL', SERVER_URL);
/**
 * Button for displaying the preferences menu inside a webview
 */

const answerQuestionsButton = (userId, questionPackId) => {
  let text;
  switch (questionPackId) {
  case '0':
    text = 'Let me know some things about you to get us started';
    break;
  case '1':
    text = 'Very interesting, I would love to know some more!';
    break;
  case '2':
    text = 'Thanks, here are some more questions.';
    break;
  case '3':
    text = 'Getting closer, a few more questions!';
    break;
  case '4':
    text = 'Almost there, here are some final questions to wrap things up.';
    break;
  default:
    text = 'Let me know somethings about you to get us started';
  }
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text,
        buttons: [
          {
            type: 'web_url',
            url: `${SERVER_URL}/${userId}/${questionPackId}`,
            title: 'Lets do it!',
            webview_height_ratio: 'tall',
          },
        ],
      },
    },
  };
};

/**
 * The persistent menu for users to use.
 */
const persistentMenu = {
  setting_type: 'call_to_actions',
  thread_state: 'existing_thread',
  call_to_actions: [],
};

/**
 * The Get Started button.
 */
const getStarted = {
  setting_type: 'call_to_actions',
  thread_state: 'new_thread',
  call_to_actions: [
    {
      payload: JSON.stringify({
        type: 'GET_STARTED',
      }),
    },
  ],
};

export default {
  answerQuestionsButton,
  persistentMenu,
  getStarted,
};
