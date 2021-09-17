import React from 'react';
import PostsDiscovery from '../pages/PostsDiscovery';
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
    const expectedTotalImages = 4;
    const { findByTestId, findAllByAltText } = renderWithRouter(<PostsDiscovery />);
    const postCard = await findByTestId('postcard-0');
    expect(postCard).toBeInTheDocument();
    const totalImages = await findAllByAltText('no-post-preview');
    expect(totalImages.length).toBe(expectedTotalImages);
  });

  it('check if the time since the post creation is rendered', async () => {
    const { findByTestId } = renderWithRouter(<PostsDiscovery />);
    const hoursSinceCreation = await findByTestId('since-creation-0');
    expect(hoursSinceCreation).toBeInTheDocument();
  });
});
