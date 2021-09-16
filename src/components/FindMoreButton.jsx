import React from 'react';

import '../styles/findMoreButtonStyle.css';

export default function FindMoreButton(props) {
  const {
    changeFeedPagination,
    paginationParam,
  } = props;

  return (
    <button
      type="button"
      onClick={() => changeFeedPagination()}
      className="find-more-button"
      disabled={!paginationParam ? true : false}
    >
      + Ver mais
    </button>
  );
}
