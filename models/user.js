/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MODELS ================================================================
import Question from './question';

// ===== STORES ================================================================
import QuestionStore from '../stores/question-store';

/**
 * User Model
 *
 * @class User
 */
export default class User {

  /**
   * @property {Array.<string>} - Defaults attributes for users
   */
  static DEFAULT_ATTRIBUTES = {
    gender: {
    },
    questions: QuestionStore.getByCategoryId(Question.CATEGORIES[1]),
    answers: {},
  };

  /* eslint-disable max-len */
  /**
   * @constructor
   *
   * @param {object} attributes)
   * @param {string} attributes.id - Messenger Page Scoped User ID ('psid')
   *   Preferred type of gift (from `Gift.CATEGORIES`)
   * @param {string} attributes.arrivalPeriod -
   *   How recently a gift should have been released (from `User.ARRIVAL_PERIODS`)
   */
   /* eslint-enable max-len */
  constructor(attributes) {
    const {
      id,
      gender,
      questions,
      answers,
    } = Object.assign({}, User.DEFAULT_ATTRIBUTES, attributes);

    this.id = id;
    this.gender = gender;
    this.questions = questions;
    this.answers = answers;
    this.isTalkingToMatch = false;
  }

  setMatch(matchId) {
    this.matchId = matchId;
    this.isTalkingToMatch = true;
  }
}
