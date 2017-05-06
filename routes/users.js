/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MODULES ===============================================================
import express from 'express';

// ===== MESSENGER =============================================================
import sendApi from '../messenger-api-helpers/send';
// import receiveApi from '../messenger-api-helpers/receive';

// ===== STORES ================================================================
import UserStore from '../stores/user-store';
import QuestionStore from '../stores/question-store';

const router = express.Router();

// Get user preferences
router.get('/:userID', ({params: {userID}}, res) => {
  const user = UserStore.get(userID) || UserStore.insert({id: userID});
  const userJSON = JSON.stringify(user);

  console.log(`GET User response: ${userJSON}`);

  res.setHeader('Content-Type', 'application/json');
  res.send(userJSON);
});

router.get('/:userID/:questionPackId',
  ({params: {userID, questionPackId}}, res) => {
    console.log('GET', userID, questionPackId);
    const user = UserStore.get(userID) || UserStore.insert({id: userID});
    user.questions = QuestionStore.getFromPackId(questionPackId);
    const userJSON = JSON.stringify(user);

    console.log(`GET User response: ${userJSON}`);

    res.setHeader('Content-Type', 'application/json');
    res.send(userJSON);
  });

/**
 * Return gifts based on preferences,
 * and store a user's preferences if `persist` if selected (idempotent)
 */
router.put('/:userID', ({body, params: {userID}}, res) => {
  console.log(`PUT User response: ${body}`);

  res.sendStatus(204);

  UserStore.updateAnswersForQuestions(userID, body.questions);

  console.log('USER', UserStore.get(userID));

  sendApi.sendAnsweredQuestionsMessage(userID);
});

export default router;
