import React from 'react';

import PropTypes from 'prop-types';

import { Link, useLocation } from 'react-router-dom';

import '../styles/filterButtonStyle.css';

export default function FilterButton(props) {
  const { buttonLabel, pathRoute } = props;
  const getCurrentRoute = useLocation();
  const currentPath = getCurrentRoute.pathname;

  const definePressedButton = () => {
    if (currentPath === `/${pathRoute}`) {
      return 'button-is-pressed';
    } return 'button-not-pressed';
  };

  return (
    <Link to={ pathRoute } className="filter-button">
      <div className={ `${definePressedButton()}` }>
        <span>
          {buttonLabel}
        </span>
      </div>
    </Link>
  );
}

FilterButton.propTypes = {
  buttonLabel: PropTypes.string,
  pathRoute: PropTypes.string,
}.isRequired;
