import React, { useState, useEffect, useRef, useCallback } from 'react';

import { useLocation } from 'react-router-dom';

import PostCard from '../components/PostCard';

import getPostsList from '../services/getPostsList';

export default function PostsFeed() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [redditPosts, setRedditPosts] = useState([]);
  const [paginationParam, setPaginationParam] = useState('');
  const [paginationCount, setPaginationCount] = useState();
  const currentRoute = useLocation();
  const currentPath = currentRoute.pathname;
  const observer = useRef();

  const lastPostElementRef = useCallback((node) => {
    if (isPageLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && paginationParam) {
        setPaginationCount((previousCount) => previousCount ? previousCount + 1 : 1)
      }
    });
    if (node) observer.current.observe(node);
  }, [isPageLoading]);

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
    if (paginationCount) {
      setMorePosts();
    }
  }, [paginationCount])

  const renderPostCards = () => (
    redditPosts
      .map(({ data }, index) => {
        if (redditPosts.length === index + 1) {
          return (
            <PostCard
              key={index}
              title={data.title}
              created_utc={data.created_utc}
              author={data.author}
              postUrl={data.url}
              lastPostRef={lastPostElementRef}
              media={data.media}
            />
          );
        }
        return (
          <PostCard
            key={index}
            title={data.title}
            created_utc={data.created_utc}
            author={data.author}
            postUrl={data.url}
            media={data.media}
          />
        );
      })
  );

  return (
    <div>
      <main>
        { !redditPosts ? "loading..." : renderPostCards() }
      </main>
      <footer>
      {paginationParam ? null : 'Você chegou ao final dos tópicos'}
      </footer>
    </div>
  );
}
