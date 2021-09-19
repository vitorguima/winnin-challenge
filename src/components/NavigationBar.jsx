import React from 'react';
import FilterButton from './FilterButton';

import '../styles/navigationBarStyle.css';

export default function NavigationBar() {
  return (
    <nav>
      <div className="buttons-wrapper">
        <FilterButton
          label="Hot"
          pathRoute="hot"
        />
        <FilterButton
          label="News"
          pathRoute="new"
        />
        <FilterButton
          label="Rising"
          pathRoute="rising"
        />
      </div>
    </nav>
  );
}
