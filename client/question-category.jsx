/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/react-in-jsx-scope */

import React from 'react';
import {CellBody, CellFooter, CellHeader, FormCell} from 'react-weui';

import SelectedIndicator from './selected-indicator.jsx';

/**
 * Component for each gift category
 * Conditionally renders an indicator is the categoyr is selected
 */

const GiftCategory = ({title, subtitle, image, selected, setQuestionCategory}) => {
  const imagePath = `/media/${image}`;

  return (
    <FormCell
      radio
      className='question-category'
      onClick={() => setQuestionCategory()}
    >
      <CellHeader>
        <SelectedIndicator on={selected}/>
      </CellHeader>

      <CellBody className='question-title checkbox-text'>{title}</CellBody>
      <CellBody className='question-subtitle checkbox-text'>{subtitle}</CellBody>

      <CellFooter className='question-image'>
        <img src={imagePath} />
      </CellFooter>
    </FormCell>
  );
};

GiftCategory.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired, // name of file in `../public/media`
  selected: React.PropTypes.bool.isRequired,
  setQuestionCategory: React.PropTypes.func.isRequired,
};

export default GiftCategory;
