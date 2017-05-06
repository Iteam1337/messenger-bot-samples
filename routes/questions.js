/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MODULES ===============================================================
import express from 'express';

// ===== STORES ================================================================
import QuestionStore from '../stores/question-store';

const router = express.Router();

// Get Gift page
router.get('/:questionCategoryId', ({params: {questionCategoryId}}, res) => {
  const questions = QuestionStore.getByCategoryId(questionCategoryId);

  const questionJSON = JSON.stringify(questions);
  console.log(`GET Gift response: ${questionJSON}`);

  res.render(
    './index',
    {
      demo: process.env.DEMO,
      questions: questionJSON,
    }
  );
});

export default router;
