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

/* eslint-disable max-len */
QUESTION_STORE.insert(
  new Question(
    'id-0',
    '0',
    'It\'s very important to ${HIM_HER} to help t${HE_SHE} people around ${HIM_HER}. ${HE_SHE} wants to care for other people',
    false,
    BENEVOLENCE,
  ));

QUESTION_STORE.insert(
  new Question(
    'id-1',
    '1',
    'It is important to ${HIM_HER} to be loyal to ${HIS_HER} friends. ${HE_SHE} wants to devote himself to people close to ${HIM_HER}',
    false,
    BENEVOLENCE,
  ));

QUESTION_STORE.insert(
  new Question(
    'id-2',
    '2',
    '${HE_SHE} thinks it is important that every person in t${HE_SHE} world be treated equally. ${HE_SHE} wants justice for everybody, even for people ${HE_SHE} doesn’t know.',
    false,
    UNIVERSALISM,
  ));

QUESTION_STORE.insert(
  new Question(
    'id-3',
    '3',
    'It is important to ${HIM_HER} to listen to people who are different from ${HIM_HER}. Even when ${HE_SHE} disagrees with them, ${HE_SHE} still wants to understand them.',
    false,
    UNIVERSALISM,
  ));

QUESTION_STORE.insert(
  new Question(
    'id-4',
    '4',
    '${HE_SHE} strongly believes that people should care for nature. Looking after t${HE_SHE} environment is important to ${HIM_HER}',
    false,
    UNIVERSALISM,
  ));

QUESTION_STORE.insert(
  new Question(
    'id-5',
    '5',
    'Thinking up new ideas and being creative is important to ${HIM_HER}. ${HE_SHE} likes to do things in ${HIS_HER} own original way.',
    false,
    SELFDIRECTION,
  ));

QUESTION_STORE.insert(
  new Question(
    'id-6',
    '6',
    'It is important to ${HIM_HER} to make ${HIS_HER} own decisions about what ${HE_SHE} does. ${HE_SHE} likes to be free to plan and to choose ${HIS_HER} activities for himself.',
    false,
    SELFDIRECTION,
  ));

/* eslint-enable max-len */

export default QUESTION_STORE;
