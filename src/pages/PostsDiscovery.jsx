import React from 'react';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import PostsFeed from '../components/PostsFeed';

export default function PostsDiscovery() {
  return (
    <div>
      <Header />
      <NavigationBar />
      <PostsFeed />
    </div>
  )
}
