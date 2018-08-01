import React from 'react';
import PropTypes from 'prop-types';

import { Svg } from 'components/shared/svg/svg';

import './styles/pill.css';

export const Pill = ({ svg, label, onSvgClick }) => (
    <div className="pill" onClick={onSvgClick}>
      { label }
      { svg &&
        <div className="pill-box">
          <Svg path={svg} className="pill-icon" />
        </div>
      }
    </div>
  );

Pill.propTypes = {
  svg: PropTypes.string,
  label: PropTypes.string,
  onSvgClick: PropTypes.func
};
