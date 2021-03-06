import React from 'react';
import PostDiscovery from '../pages/PostsDiscovery';
import renderWithRouter from './RenderWithRouter';

describe('tests PostsDiscovery static elements renderization', () => {
  it('check if Header is rendered', () => {
    const { getByText } = renderWithRouter(<PostDiscovery />);
    const reactText = getByText('REACT');
    const jsText = getByText('JS');

    expect(reactText).toBeInTheDocument();
    expect(jsText).toBeInTheDocument();
  });

  it('check if FilterButtons are rendered', () => {
    const { getByText } = renderWithRouter(<PostDiscovery />);
    const hotButton = getByText('Hot');
    const newsButton = getByText('News');
    const risingButton = getByText('Rising');

    expect(hotButton).toBeInTheDocument();
    expect(newsButton).toBeInTheDocument();
    expect(risingButton).toBeInTheDocument();
  });

  it('check if FindMoreButton button is rendered', () => {
    const { getByText } = renderWithRouter(<PostDiscovery />);
    const findMoreButton = getByText('+ Ver mais');

    expect(findMoreButton).toBeInTheDocument();
  });
});
