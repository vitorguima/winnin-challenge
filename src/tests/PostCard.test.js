/* eslint-disable max-len */
import React from 'react';
import PostsDiscovery from '../pages/PostsDiscovery';
import renderWithRouter from './RenderWithRouter';
import mockInitialPostsList from '../__mocks__/mockInitialPostsList';

describe('tests PostCard elements renderization', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockInitialPostsList),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('check if posts list cards are rendered', async () => {
    const expectedWithNoThumb = 3;
    const expectedWithThumb = 1;
    const { findByTestId, findAllByAltText } = renderWithRouter(<PostsDiscovery />);
    const postCard = await findByTestId('postcard-0');
    expect(postCard).toBeInTheDocument();

    const totalNoThumbs = await findAllByAltText('no-post-preview');
    expect(totalNoThumbs.length).toBe(expectedWithNoThumb);

    const totalWithThumbs = await findAllByAltText('post-preview');
    expect(totalWithThumbs.length).toBe(expectedWithThumb);
  });

  it('check if the time since the post creation is rendered', async () => {
    const { findByTestId } = renderWithRouter(<PostsDiscovery />);
    const hoursSinceCreation = await findByTestId('since-creation-0');
    expect(hoursSinceCreation).toBeInTheDocument();
  });

  it('check if posts with creation time less than one hour are rendered correctly', async () => {
    const { findByText, findAllByText } = renderWithRouter(<PostsDiscovery />);
    const createdPost = await findByText('enviado há menos de uma hora por');
    expect(createdPost).toBeInTheDocument();

    const totalPosts = await findAllByText('enviado há menos de uma hora por');
    expect(totalPosts.length).toBe(1);
  });

  it('check if the thumbnails are rendered', async () => {
    const expectedTotalThumbs = 4;
    const { findByTestId, findAllByTestId } = renderWithRouter(<PostsDiscovery />);
    const thubmnail = await findByTestId('thumbnail-0');
    expect(thubmnail).toBeInTheDocument();
    const totalThumbnails = await findAllByTestId(/thumbnail-/i);
    expect(totalThumbnails.length).toBe(expectedTotalThumbs);
  });
});
