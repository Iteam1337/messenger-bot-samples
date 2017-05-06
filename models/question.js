/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Question Model
 *
 * @class Question
 */
export default class Question {
  /**
   * @property {Array.<string>} - Available question categories
   */

  static CATEGORIES = [
    'selfdirection',
    'benevolence',
    'universalism',
    'stimulaton',
    'hedonism',
    'achievement',
    'power',
    'security',
    'conformity',
    'tradition',
  ];

  /**
   * Create a Gift
   *
   * @param {string} id - Unique idenitifier of this gift.
   * @param {string} name - Human readable gift name.
   * @param {object} images - Path to images.
   * @param {object} images.original - Full size image.
   * @param {object} images.square - Square cropped image.
   * @param {string} description - Description of the gift.
   * @param {string} category - Category of this gift (`Gift.CATEGORIES`).
   */
  constructor(id, question, value = false, category) {
    this.id = id;
    this.question = question;
    this.value = value;
    this.category = category;
  }
}
