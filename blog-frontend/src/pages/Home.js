import React, { useEffect, useState } from 'react'
import API from '../api';
import PostCard from '../components/PostCard';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        API.get('/posts').then(response => setPosts(response.data));
    }, []);
    useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.get('/posts');
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const result = posts.filter(post =>
      post.title.toLowerCase().includes(lowerSearch) ||
      post.content.toLowerCase().includes(lowerSearch)
    );
    setFilteredPosts(result);
  }, [search, posts]);

  return (
    <div className='container'>
        <h3>All Blog Posts</h3>
        <input
        className="form-control mb-4"
        type="text"
        placeholder="Search by title or content..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />

        {filteredPosts.length === 0 && <p>No posts found.</p>}
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
    </div>
  )
}

export default Home;