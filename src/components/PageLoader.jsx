import React from 'react';

import PropTypes from 'prop-types';

import LoadingSvg from '../assets/Loading.svg';

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
      <img src={ LoadingSvg } alt="loading" />
    </div>
  );
}

PageLoader.propTypes = {
  visibility: PropTypes.bool,
}.isRequired;
