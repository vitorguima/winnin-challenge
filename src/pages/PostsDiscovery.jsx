import React from 'react';

import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import PostsFeed from '../components/PostsFeed';

import '../styles/postsDiscoveryStyle.css';

export default function PostsDiscovery() {
  return (
    <div className="dicovery-page-wrapper">
      <Header />
      <NavigationBar />
      <PostsFeed />
    </div>
  );
}
