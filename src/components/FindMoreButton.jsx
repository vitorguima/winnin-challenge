import React from 'react';

import PropTypes from 'prop-types';

import '../styles/findMoreButtonStyle.css';

export default function FindMoreButton(props) {
  const {
    changeFeedPagination,
    paginationParam,
    isPageLoading,
  } = props;

  const valaidateButtonVisibility = () => {
    if (!paginationParam || isPageLoading) {
      return 'hidden-button';
    }
    return '';
  };

  return (
    <button
      type="button"
      onClick={ () => changeFeedPagination() }
      className={ `find-more-button ${valaidateButtonVisibility()}` }
      disabled={ !paginationParam || isPageLoading }
    >
      + Ver mais
    </button>
  );
}

FindMoreButton.propTypes = {
  changeFeedPagination: PropTypes.func,
  paginationParam: PropTypes.string,
  isPageLoading: PropTypes.bool,
}.isRequired;
