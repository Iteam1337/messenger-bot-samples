/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== STORES ================================================================
import Store from './store';

// ===== MODELS ================================================================
import User from '../models/user';

/**
 * Stores User data
 */
class UserStore extends Store {

  /**
   * Create a user Object and store into user store.
   *
   * @param {Object} props User properties
   * @returns {Object} User model
   */
  insert(props) {
    const user = new User(props);
    // console.log(`Inserting User ${JSON.stringify(user)}`);

    this.set(props.id, user);
    return user;
  }

  updateAnswersForQuestions(userId, questions) {
    console.log('updateAnswersForQuestions', userId);
    const user = this.get(userId);

    questions.forEach((question) => {
      user.answers[question.id] = question.value;
    });
  }

  // compareUserAnswers(userId1, userId2) {
  // }
}

// Initialize the global user store.
const USER_STORE = new UserStore();

export default USER_STORE;
