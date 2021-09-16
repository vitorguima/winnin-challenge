import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import '../styles/filterButtonStyle.css';

export default function FilterButton(props) {
  const { buttonLabel, pathRoute } = props;
  const getCurrentRoute = useLocation();
  const currentPath = getCurrentRoute.pathname;

  const definePressedButton = () => {
    return currentPath === `/${pathRoute}` ? 'button-is-pressed' : 'button-not-pressed';
  };

  return (
    <div className={ `${definePressedButton()}` }>
      <Link to={pathRoute}>
        <span>
          {buttonLabel}
        </span>
      </Link>
    </div>
  );
}
