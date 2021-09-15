import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import PostCard from '../components/PostCard';

import getPostsList from '../services/getPostsList';

export default function PostsFeed() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [redditPosts, setRedditPosts] = useState([]);
  const [paginationParam, setPaginationParam] = useState('');
  const currentRoute = useLocation();
  const currentPath = currentRoute.pathname;

  const renderPostCards = () => {
    return(
      redditPosts
        .map(({ data }, index) => <PostCard key={index} title={data.title} created_utc={data.created_utc} author={data.author} url={data.url} />)
    );
  }

  useEffect(() => {
    const setInitialPosts = async () => {
      setIsPageLoading(true);
      const fetchReturn = await getPostsList(currentPath);
      setRedditPosts(fetchReturn.children);
      setPaginationParam(fetchReturn.after);
      setIsPageLoading(false);
    };
    setInitialPosts();
  }, [currentPath])

  return (
    <div>
      <main>
        { isPageLoading ? "loading..." : renderPostCards() }
      </main>
      <footer>
        <button
          type="button"
        >
          + Ver mais
        </button>
      </footer>
    </div>
  );
}
