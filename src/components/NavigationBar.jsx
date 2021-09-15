import React from 'react';
import FilterButton from './FilterButton';

export default function NavigationBar() {
  return (
    <nav>
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
    </nav>
  )
}
