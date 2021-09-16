import React from 'react';

import PropTypes from 'prop-types';

import '../styles/findMoreButtonStyle.css';

export default function FindMoreButton(props) {
  const {
    changeFeedPagination,
    paginationParam,
  } = props;

  return (
    <button
      type="button"
      onClick={ () => changeFeedPagination() }
      className="find-more-button"
      disabled={ !paginationParam }
    >
      + Ver mais
    </button>
  );
}

FindMoreButton.propTypes = {
  changeFeedPagination: PropTypes.func,
  paginationParam: PropTypes.string,
}.isRequired;
