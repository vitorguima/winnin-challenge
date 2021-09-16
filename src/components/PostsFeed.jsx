import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import PostCard from './PostCard';
import LoadingSvg from '../assets/Loading.svg';

import getPostsList from '../services/getPostsList';

import '../styles/postsFeedStyles.css';
import FindMoreButton from './FindMoreButton';

export default function PostsFeed() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [redditPosts, setRedditPosts] = useState([]);
  const [paginationParam, setPaginationParam] = useState('');
  const [paginationCount, setPaginationCount] = useState();
  const currentRoute = useLocation();
  const currentPath = currentRoute.pathname;

  useEffect(() => {
    const setInitialPosts = async () => {
      setIsPageLoading(true);
      const fetchReturn = await getPostsList(currentPath, '');
      setPaginationParam(fetchReturn.after);
      setRedditPosts([...fetchReturn.children]);
      setIsPageLoading(false);
    };
    setInitialPosts();
  }, [currentPath]);

  useEffect(() => {
    const setMorePosts = async () => {
      setIsPageLoading(true);
      const fetchReturn = await getPostsList(currentPath, paginationParam);
      setRedditPosts((previousList) => [...previousList, ...fetchReturn.children]);
      setPaginationParam(fetchReturn.after);
      setIsPageLoading(false);
    };
    if (paginationCount && !isPageLoading) {
      setMorePosts();
    }
  }, [paginationCount]);

  const renderPostCards = () => (
    redditPosts.map(({ data }, index) => (
      <PostCard
        key={ index }
        title={ data.title }
        createdUtc={ data.created_utc }
        author={ data.author }
        postUrl={ data.url }
        media={ data.media }
        thumbnail={ data.thumbnail }
      />
    ))
  );

  const changeFeedPagination = () => {
    const interaction = 1;
    if (paginationParam) {
      setPaginationCount((previousCount) => {
        if (previousCount) {
          return (previousCount + interaction);
        }
        return (interaction);
      });
    }
  };

  const renderEndOfPagination = () => (
    <div className="end-of-pagination">
      <p>Você chegou ao fim da lista!</p>
    </div>
  );

  const renderLoadingSvg = () => (
    <div className="loading-wrapper">
      <img src={ LoadingSvg } alt="loading" />
    </div>
  );

  return (
    <div className="posts-feed-wrapper">
      <main>
        { !redditPosts ? null : renderPostCards() }
      </main>
      <footer className="footer-wrapper">
        {isPageLoading ? renderLoadingSvg() : null}
        {!paginationParam && paginationCount > 0 ? renderEndOfPagination() : null}
        <FindMoreButton
          changeFeedPagination={ changeFeedPagination }
          paginationParam={ paginationParam }
        />
      </footer>
    </div>
  );
}
