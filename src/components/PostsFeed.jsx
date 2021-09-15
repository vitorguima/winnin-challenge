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
  // const observer = useRef();

  // const lastPostElementRef = useCallback((node) => {
  //   if (isPageLoading) return;
  //   if (observer.current) observer.current.disconnect();
  //   observer.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       setPaginationCount((previousCount)=> previousCount ? previousCount + 1 : 1)
  //     }
  //   });
  //   if (node) observer.current.observe(node);
  // }, [isPageLoading]);

  const renderPostCards = () => {
    return(
      redditPosts
        .map(({ data }, index) => <PostCard key={index} title={data.title} created_utc={data.created_utc} author={data.author} url={data.url} />)
    );
  }

  // const renderPostCards = () => (
  //   reddiPosts
  //     .map(({ data }, index) => {
  //       if (redditPosts.length === index + 1) {
  //         return (
  //           <PostCard
  //             key={index}
  //             title={data.title}
  //             created_utc={data.created_utc}
  //             author={data.author}
  //             url={data.url}
  //             lastPostRef={lastPostElementRef}
  //           />
  //         );
  //       }
  //       return (
  //         <PostCard
  //           key={index}
  //           title={data.title}
  //           created_utc={data.created_utc}
  //           author={data.author}
  //           url={data.url}
  //         />
  //       );
  //     })
  // );

  useEffect(() => {
    const setInitialPosts = async () => {
      setIsPageLoading(true);
      const fetchReturn = await getPostsList(currentPath, '');
      setRedditPosts(fetchReturn.children);
      setPaginationParam(fetchReturn.after);
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

  return (
    <div>
      <main>
        { isPageLoading ? "loading..." : renderPostCards() }
      </main>
      <footer>
        <button
          type="button"
          onClick={() => setPaginationCount((previousCount)=> previousCount ? previousCount + 1 : 1)}
        >
          + Ver mais
        </button>
      </footer>
    </div>
  );
}
