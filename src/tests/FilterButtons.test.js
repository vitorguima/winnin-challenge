/* eslint-disable max-len */
import React from 'react';
import { fireEvent } from '@testing-library/dom';
import PostsDiscovery from '../pages/PostsDiscovery';
import renderWithRouter from './RenderWithRouter';

describe('tests PostsDiscovery dynamic elements renderization', () => {
  const pressedButtonClass = 'button-is-pressed';
  it('check if button with label equal to Hot is redirecting to the correct route', async () => {
    const { getByText, history } = renderWithRouter(<PostsDiscovery />);
    const hotButton = getByText('Hot');
    expect(hotButton).toBeInTheDocument();

    fireEvent.click(hotButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/hot');
  });

  it('check if button with label equal to News is redirecting to the correct route', async () => {
    const { getByText, history } = renderWithRouter(<PostsDiscovery />);
    const newButton = getByText('News');
    expect(newButton).toBeInTheDocument();

    fireEvent.click(newButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/new');
  });

  it('check if button with label equal to Rising is redirecting to the correct route', async () => {
    const { getByText, history } = renderWithRouter(<PostsDiscovery />);
    const risingButton = getByText('Rising');
    expect(risingButton).toBeInTheDocument();

    fireEvent.click(risingButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/rising');
  });

  it('check if button with label equal to Hot is changing class name after click', async () => {
    const { getByText, container } = renderWithRouter(<PostsDiscovery />);
    const hotButton = getByText('Hot');
    fireEvent.click(hotButton);
    expect(container.getElementsByClassName(pressedButtonClass).length).toBe(1);
  });

  it('check if button with label equal to News is changing class name after click', async () => {
    const { getByText, container } = renderWithRouter(<PostsDiscovery />);
    const newsButton = getByText('News');
    fireEvent.click(newsButton);
    expect(container.getElementsByClassName(pressedButtonClass).length).toBe(1);
  });

  it('check if button with label equal to Rising is changing class name after click', async () => {
    const { getByText, container } = renderWithRouter(<PostsDiscovery />);
    const risingButton = getByText('Rising');
    fireEvent.click(risingButton);
    expect(container.getElementsByClassName(pressedButtonClass).length).toBe(1);
  });
});
