import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost ] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const fetchPost = async () => {
    try {
      const response = await API.get(`/posts/${id}`);
      setPost(response.data);
    } catch(err) {
      console.error('Error fetching post: ', err);
    }
  };
  fetchPost();
}, [id]);


const handleDelete = async () => {
  try {
    await API.delete(`/posts/${id}`);
    navigate('/');
  } catch (err) {
    console.error('Error deleting post: ', err);
  }
};

if(!post) return <div className='container mt-5'>Loading...</div> 

const currentUser = JSON.parse(localStorage.getItem('user'));
const isOwner = currentUser && currentUser.id === post.User?.id;

  return (
    <div className='container mt-5'>
      <h2>{post.title}</h2>
      <p className='text-muted'> By {post.User?.username} on {new Date(post.createdAt).toLocaleDateString()}</p>
      <hr/>

      <div dangerouslySetInnerHTML={{__html: post.content }} />

      {isOwner && (
        <div className='mt-4'>
          <button className='btn btn-warning me-2'
          onClick={() => {
            navigate(`/edit-post/${post._id}`);
          }} > Edit </button>

          <button className='btn btn-danger' 
          onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default PostDetail;

