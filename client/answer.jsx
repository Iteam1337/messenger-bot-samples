/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/react-in-jsx-scope */

import React from 'react';
import {CellBody, CellHeader, FormCell} from 'react-weui';

import SelectedIndicator from './selected-indicator.jsx';

/**
 * Component for each gift category
 * Conditionally renders an indicator is the categoyr is selected
 */

const Answer = ({title, selected, setAnswer}) => {
  return (
    <FormCell
      radio
      className='answer'
      onClick={() => setAnswer()}
    >
      <CellHeader>
        <SelectedIndicator on={selected}/>
      </CellHeader>

      <CellBody className='answer-title checkbox-text'>{title}</CellBody>
    </FormCell>
  );
};

Answer.propTypes = {
  title: React.PropTypes.string.isRequired,
  selected: React.PropTypes.bool.isRequired,
  setQuestionCategory: React.PropTypes.func.isRequired,
};

export default Answer;
