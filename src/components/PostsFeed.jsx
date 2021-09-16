import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import PostCard from '../components/PostCard';

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
  }, [currentPath])

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
  }, [paginationCount])

  const renderPostCards = () => {
    return(
      redditPosts.map(({ data }, index) => {
        return (
          <PostCard
            key={index}
            title={data.title}
            created_utc={data.created_utc}
            author={data.author}
            postUrl={data.url}
            media={data.media}
          />
        )})
    );
  }

  const changeFeedPagination = () => {
    const interaction = 1;
    setPaginationCount((previousCount)=> previousCount ? previousCount + interaction : interaction);
  }

  return (
    <body className="posts-feed-wrapper">
      <main>
        { !redditPosts ? "loading..." : renderPostCards() }
      </main>
      <footer>
      <FindMoreButton 
        changeFeedPagination={changeFeedPagination}
      />
      {/* {paginationParam === null ? null : 'Você chegou ao final dos tópicos'} */}
      </footer>
    </body>
  );
}
