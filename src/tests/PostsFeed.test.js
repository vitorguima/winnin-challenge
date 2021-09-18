import React from 'react';
import PostsFeed from '../components/PostsFeed';
import renderWithRouter from './RenderWithRouter';
import mockInitialPostsList from '../__mocks__/mockInitialPostsList';

describe('tests PostsDiscovery dynamic elements renderization', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockInitialPostsList),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('check if posts list cards are rendered', async () => {
    const { findByTestId } = renderWithRouter(<PostsFeed />);
    const postCardDiv0 = await findByTestId('postcard-0');
    expect(postCardDiv0).toBeInTheDocument();

    const postCardDiv1 = await findByTestId('postcard-1');
    expect(postCardDiv1).toBeInTheDocument();

    const postCardDiv2 = await findByTestId('postcard-2');
    expect(postCardDiv2).toBeInTheDocument();

    const postCardDiv3 = await findByTestId('postcard-3');
    expect(postCardDiv3).toBeInTheDocument();
  });

  it('check if there are four cards rendered', async () => {
    const expectedTotalCards = 4;
    const { findAllByTestId } = renderWithRouter(<PostsFeed />);
    const totalCards = await findAllByTestId(/postcard-/i);
    expect(totalCards.length).toBe(expectedTotalCards);
  });
});
