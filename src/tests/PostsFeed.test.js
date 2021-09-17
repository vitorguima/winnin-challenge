import { findByTestId } from '@testing-library/react';
import React from 'react';
import PostsFeed from '../components/PostsFeed';
import renderWithRouter from './RenderWithRouter';

describe('tests PostsDiscovery dynamic elements renderization', () => {
  beforeEach(() => {
    // console.log("RUNS BEFORE EACH TEST")
    jest.mock('../__mocks__/fetch');
  });

  it('check if posts list cards are rendered', async () => {
    renderWithRouter(<PostsFeed />);
    const postCardDiv = await findByTestId('postcard-0');
    expect(postCardDiv).toBeInTheDocument();
  });

  it('check if there are four cards rendered', async () => {
    const expectedTotalCards = 4;
    renderWithRouter(<PostsFeed />);
    const totalCards = await findByTestId(/postcard/i);
    expect(totalCards.length).toBe(expectedTotalCards);
  });
});
