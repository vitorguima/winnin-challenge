/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import useSWR from 'swr';

import PostCard from './PostCard';

import getPostsList from '../services/getPostsList';

import '../styles/postsFeedStyles.css';

import FindMoreButton from './FindMoreButton';
import PageLoader from './PageLoader';

export default function PostsFeed() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [redditPosts, setRedditPosts] = useState([]);
  const [paginationParam, setPaginationParam] = useState('');
  const [paginationCount, setPaginationCount] = useState();
  const currentRoute = useLocation();
  const currentPath = currentRoute.pathname;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const ENDPOINT = `https://www.reddit.com/r/reactjs${currentPath}.json?after=${paginationParam}&limit=9`;
  const { data } = useSWR(ENDPOINT, fetcher);

  // useEffect(() => {
  //   const setInitialPosts = async () => {
  //     setIsPageLoading(true);
  //     const fetchReturn = await getPostsList(currentPath, '');
  //     setPaginationParam(fetchReturn.after);
  //     setRedditPosts([...fetchReturn.children]);
  //     setIsPageLoading(false);
  //   };
  //   setPaginationCount(0);
  //   setRedditPosts([]);
  //   setInitialPosts();
  // }, [currentPath]);

  useEffect(() => {
    const setMorePosts = async () => {
      setIsPageLoading(true);
      const fetchReturn = await getPostsList(currentPath, paginationParam);
      setRedditPosts([...data.data.children, ...fetchReturn.children]);
      setPaginationParam(fetchReturn.after);
      setIsPageLoading(false);
    };
    if (paginationCount && !isPageLoading) {
      setMorePosts();
    }
  // currentPath', 'isPageLoading' e 'paginationParam' não devem ser inseridos como dependência do useEffect para que não seja criado um loop infinito de atualizações.
  // A idéia do state 'paginationCount' é ser uma referência para que a paginação aconteça corretamente, garantindo que esse fluxo seja executado apenas quando houver um click no botão 'FindMoreButton', responsável por atualizar esse estado.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationCount]);

  const renderPostCards = () => {
    if (!data) {
      return (
        <PageLoader
          visibility={ !paginationCount }
        />
      );
    }
    return (
      data.data.children.map(({ data }, index) => (
        <PostCard
          key={ index }
          testId={ index }
          title={ data.title }
          createdUtc={ data.created_utc }
          author={ data.author }
          postUrl={ data.permalink }
          media={ data.media }
          thumbnail={ data.thumbnail }
        />
      ))
    );
  };

  const changeFeedPagination = async () => {
    const interaction = 1;
    const fetchResponse = await getPostsList(currentPath, paginationParam);
    const newPaginationParam = fetchResponse.after;
    if (paginationParam) {
      setPaginationCount((previousCount) => {
        if (previousCount) {
          setPaginationParam(newPaginationParam);
          return (previousCount + interaction);
        }
        setPaginationParam(newPaginationParam);
        return (interaction);
      });
    }
  };

  const renderEndOfPagination = () => (
    <div className="end-of-pagination">
      <p>Você chegou ao fim da lista!</p>
    </div>
  );

  return (
    <div className="posts-feed-wrapper">
      <main>
        { renderPostCards() }
      </main>
      <footer className="footer-wrapper">
        <PageLoader
          visibility={ paginationCount > 0 && isPageLoading }
        />
        {!paginationParam && paginationCount > 0 ? renderEndOfPagination() : null}
        <FindMoreButton
          changeFeedPagination={ changeFeedPagination }
          // paginationParam={ paginationParam }
          isPageLoading={ isPageLoading }
        />
      </footer>
    </div>
  );
}
