import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';

import getPostsList from '../services/getPostsList';

export default function PostsDiscovery() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [topicType, setTopicType] = useState('hot');
  const [redditPosts, setRedditPosts] = useState([]);
  const [paginationParam, setPaginationParam] = useState('');

  useEffect(() => {
    const setInitialPosts = async () => {
      setIsPageLoading(true);
      const fetchReturn = await getPostsList(topicType, '');
      setRedditPosts(fetchReturn.children);
      setPaginationParam(fetchReturn.after);
      setIsPageLoading(false);
    };
    setInitialPosts();
  }, [])

  // useEffect => [topicType];
  // useEffect => [paginationParam];

  const renderPostCards = () => {
    return(
      redditPosts
        .map(({ data }) => <PostCard title={data.title} created_utc={data.created_utc} author={data.author} url={data.url}/>)
    )
  }

  return (
    <div>
      <header>
        <p>Header</p>
      </header>
      <nav>
        <button
          type="button"
        >
          Hot
        </button>
        <button
          type="button"
        >
          News
        </button>
        <button
          type="button"
        >
          Rising
        </button>
      </nav>
      <section>
        <article>
          { isPageLoading ? "loading..." : renderPostCards() }
        </article>
      </section>
      <footer>
        <button>
          + Ver mais
        </button>
      </footer>
    </div>
  )
}
