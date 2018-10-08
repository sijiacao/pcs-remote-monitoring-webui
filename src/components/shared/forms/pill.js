// Copyright (c) Microsoft. All rights reserved.

import React from 'react';
import PropTypes from 'prop-types';

import { Svg } from 'components/shared/svg/svg';

import './styles/pill.css';

export const Pill = ({ svg, label, onSvgClick }) => (
    <div className="pill">
      { label }
      { svg && <Svg onClick={onSvgClick} path={svg} className="pill-icon" /> }
    </div>
  );

Pill.propTypes = {
  svg: PropTypes.string,
  label: PropTypes.string,
  onSvgClick: PropTypes.func
};
