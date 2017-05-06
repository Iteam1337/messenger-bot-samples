/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/react-in-jsx-scope */

/* =============================================
   =                   Setup                   =
   ============================================= */

/* ----------  External Libraries  ---------- */

import React from 'react';
import 'whatwg-fetch';

/* ----------  External UI Kit  ---------- */

import {
  Button,
  ButtonArea,
  CellsTitle,
  Form,
} from 'react-weui';

/* ----------  Internal Components  ---------- */
import Answer from './answer.jsx';
import Loading from './loading.jsx';

/* ----------  Helpers  ---------- */

import WebviewControls from '../messenger-api-helpers/webview-controls';

/* ----------  Models  ---------- */

import Question from '../models/question';
// import User from '../models/user';

/* =============================================
   =            React Application              =
   ============================================= */

export default class App extends React.PureComponent {

  /* ----------  React Configuration  ---------- */

  static propTypes = {
    userId: React.PropTypes.string.isRequired,
  }

  static answers = [
    'very much like me',
    'like me',
    'somewhat like me',
    'a little like me',
    'not like me',
    'not like me a tall',
  ];

  state = {
    questions: null,
  }

  /* =============================================
     =               Helper Methods              =
     ============================================= */

  /* ----------  Communicate with Server  ---------- */

  /**
   * Pull saved data from the server, and populate the form
   * If there's an error, we log it to the console. Errors will not be availble
   * within the Messenger webview. If you need to see them 'live', switch to
   * an `alert()`.
   *
   * @returns {undefined}
   */
  pullData() {
    const endpoint = `/users/${this.props.userId}`;
    console.log('Pulling data from ${endpoint}...');

    fetch(endpoint)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        console.error(
          status,
          `Unable to fetch user data for User ${this.props.userId}'`
        );
      }).then((jsonResponse) => {
        console.log(`Data fetched successfully: ${jsonResponse}`);

        this.setState({
          ...jsonResponse,
          questions: new Set(jsonResponse.questions),
        });
      }).catch((err) => console.error('Error pulling data', err));
  }

  pushData() {
    const content = this.jsonState();
    console.log(`Push data: ${content}`);

    fetch(`/users/${this.props.userId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: content,
    }).then((response) => {
      if (response.ok) {
        console.log('Data successfully updated on the server!');
        return;
      }

      console.error(
        response.status,
        `Unable to save user data for User ${this.props.userId}'`
      );
    }).catch((err) => console.error('Error pushing data', err)).then(() => {
      WebviewControls.close();
    });
  }

  /* ----------  Formatters  ---------- */

  // Format state for easy printing or transmission
  jsonState() {
    return JSON.stringify({
      ...this.state,
      questions: [...this.state.questions],
    });
  }

  /* ----------  State Handlers  ---------- */

  setAnswer(question, index) {
    console.log(`Set Answer: ${index}`);
    this.setState({index});
  }

  /* =============================================
     =              React Lifecycle              =
     ============================================= */

  componentWillMount() {
    this.pullData(); // Initial data fetch
  }

  /*
   * Provide the main structure of the resulting HTML
   * Delegates items out to specialized components
   *
   */
  render() {
    /**
     * If waiting for data, just show the loading spinner
     * and skip the rest of this function
     */
    if (!this.state.questions) {
      return <Loading />;
    }

    /* ----------  Main Structure  ---------- */

    return (
      <div className='app'>
          {App.questions.map((question, questionIndex) => {
            return (
              <section key={`Question_${questionIndex}`}>
                <CellsTitle>{question.question}</CellsTitle>
                <Form radio>{App.answers.map((answer, answerIndex) => {
                  return (
                    <Answer
                      key={`Answer_${answerIndex}`}
                      title={answer}
                      selected={false}
                      setAnswer={() => this.setAnswer(question, answerIndex)}
                    />
                  );
                })}</Form>
              </section>
            );
          })}

        <ButtonArea className='see-options'>
          <Button onClick={() => this.pushData()}>Answer questions</Button>
        </ButtonArea>
      </div>
    );
  }
}
