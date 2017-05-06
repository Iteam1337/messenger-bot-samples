/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== STORES ================================================================
import Store from './store';

// ===== MODELS ================================================================
import Question from '../models/question';
import questions from './data/value_statements.json';

const SERVER_URL = process.env.SERVER_URL;
const [
  SELFDIRECTION,
  BENEVOLENCE,
  UNIVERSALISM,
  STIMULATION,
  HEDONISM,
  ACHIEVEMENT,
  POWER,
  SECURITY,
  CONFORMITY,
  TRADITION,
] = Question.CATEGORIES;

/**
 * Stores data for the Gifts we display to users
 */
class QuestionStore extends Store {
  /**
   * Gets all gifts matching the given category
   *
   * @param {String} categoryId category to filter by
   * @returns {Object[]} all gifts matching the given category
   */
  getByCategoryId(categoryId) {
    /**
     * Maps don't have a filter method (nor map, reduce, and so on)
     * Rather than write our own, here we convert to an Array
     * and leverage the build-in filter method.
     */
    return [...this.data.values()]
      .filter((question) => question.category === categoryId);
  }

  getFromPackId(packId) {
    /**
     * Maps don't have a filter method (nor map, reduce, and so on)
     * Rather than write our own, here we convert to an Array
     * and leverage the build-in filter method.
     */
    return [...this.data.values()]
      .filter((question) => question.pack === packId);
  }

  /**
   * Inserts a gift to the Store using the gifts id as the key
   *
   * @param {Object} gift Gift to insert
   * @returns {Object} The inserted gift
   */
  insert(question) {
    return this.set(question.id, question);
  }
}

/**
 * Initialize the global Gift Store and populate with Gifts for the demo
 */
const QUESTION_STORE = new QuestionStore();

questions.forEach((question) => {
  console.log(question);
  const questionObj = new Question(
    `value_statement_${question.index}`,
    question.pack,
    question.text,
    false,
    question.trait,
  );
  console.log(questionObj);
  QUESTION_STORE.insert(
    questionObj
  );
});

/* eslint-enable max-len */

export default QUESTION_STORE;
