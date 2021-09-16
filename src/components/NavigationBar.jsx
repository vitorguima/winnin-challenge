import React from 'react';
import FilterButton from './FilterButton';

import '../styles/navigationBarStyles.css';

export default function NavigationBar() {
  return (
    <nav>
      <div className="buttons-wrapper">
        <FilterButton 
          buttonLabel={'Hot'}
          pathRoute={'hot'}
        />
        <FilterButton 
          buttonLabel={'News'}
          pathRoute={'new'}
        />
        <FilterButton 
          buttonLabel={'Rising'}
          pathRoute={'rising'}
        />
      </div>
    </nav>
  )
}
