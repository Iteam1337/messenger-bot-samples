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

/**
 * Button for displaying the preferences menu inside a webview
 */

const questionsButtons = ['0', '1', '2'].map((id) => {
  return {
    type: 'web_url',
    title: `Question pack ${id}`,
    url: `${SERVER_URL}/${id}`,
    webview_height_ratio: 'tall',
    messenger_extensions: true,
  };
});

/**
 * The persistent menu for users to use.
 */
const persistentMenu = {
  setting_type: 'call_to_actions',
  thread_state: 'existing_thread',
  call_to_actions: questionsButtons,
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
  questionsButtons,
  persistentMenu,
  getStarted,
};
