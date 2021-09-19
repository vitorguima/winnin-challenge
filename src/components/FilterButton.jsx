import React from 'react';

import PropTypes from 'prop-types';

import { Link, useLocation } from 'react-router-dom';

import '../styles/filterButtonStyle.css';

export default function FilterButton(props) {
  const { label, pathRoute } = props;
  const currentLocation = useLocation();
  const currentPath = currentLocation.pathname;

  const definePressedButton = () => {
    if (currentPath === `/${pathRoute}`) {
      return 'button-is-pressed';
    }
    return 'button-not-pressed';
  };

  return (
    <Link to={ pathRoute } className="filter-button">
      <div className={ definePressedButton() }>
        <span>
          {label}
        </span>
      </div>
    </Link>
  );
}

FilterButton.propTypes = {
  label: PropTypes.string,
  pathRoute: PropTypes.string,
}.isRequired;
