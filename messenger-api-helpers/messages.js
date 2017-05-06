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
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'Let me know somethings about you to get us started',
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
