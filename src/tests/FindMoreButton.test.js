/* eslint-disable max-len */
import React from 'react';
import { fireEvent } from '@testing-library/dom';
import PostsFeed from '../components/PostsFeed';
import renderWithRouter from './RenderWithRouter';
import mockInitialPostsList from '../__mocks__/mockInitialPostsList';
import mockPaginationPostsList from '../__mocks__/mockPaginationPostsList';

describe('tests PostsDiscovery dynamic elements renderization', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('check if FindMoreButton is rendering new PostCards after user clicks on it', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockInitialPostsList).mockResolvedValueOnce(mockPaginationPostsList),
    });

    const { findByText, findAllByTestId } = renderWithRouter(<PostsFeed />);
    const expectedTotalCards1 = 4;
    let totalCards = await findAllByTestId(/postcard-/i);
    expect(totalCards.length).toBe(expectedTotalCards1);

    const findMoreButton = await findByText('+ Ver mais');
    fireEvent.click(findMoreButton);
    const expectedTotalCards2 = 4;
    totalCards = await findAllByTestId(/postcard-/i);
    expect(totalCards.length).toBe(expectedTotalCards2);
  });

  it('check if new paginations are being prevented if there is no new pagination param', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockInitialPostsList).mockResolvedValueOnce(mockPaginationPostsList),
    });

    const { findByText } = renderWithRouter(<PostsFeed />);
    const findMoreButton = await findByText('+ Ver mais');
    fireEvent.click(findMoreButton);
    const endOfPageSign = await findByText('Você chegou ao fim da lista!');
    expect(endOfPageSign).toBeInTheDocument();
  });
});
