import React from 'react';

import '../styles/findMoreButtonStyle.css';

export default function FindMoreButton(props) {
  const {
    changeFeedPagination,
  } = props;

  return (
    <button
      type="button"
      onClick={() => changeFeedPagination()}
      className="find-more-button"
    >
      + Ver mais
    </button>
  )
}
