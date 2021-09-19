import React from 'react';

import PropTypes from 'prop-types';

import { ReactComponent as LoadingSvg } from '../assets/Loading.svg';

import '../styles/pageLoaderStyle.css';

export default function PageLoader(props) {
  const {
    visibility,
  } = props;

  const valaidateLoaderVisibility = () => (visibility ? '' : 'hidden-loader');

  return (
    <div
      className={ `${valaidateLoaderVisibility()} loading-wrapper` }
    >
      <LoadingSvg />
    </div>
  );
}

PageLoader.propTypes = {
  visibility: PropTypes.bool,
}.isRequired;
