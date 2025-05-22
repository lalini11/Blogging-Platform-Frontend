import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  const fetchPost = async () => {
    try {
      const response = await API.get(`/posts/${id}`);
      const post = response.data;

      const currentUser = JSON.parse(localStorage.getItem('user'));
      if(post.User?.id!== currentUser?.id) {
        setError('You are not authorized to edit this post.');
        return;
      }

      setTitle(post.title);
      setContent(post.content);
      setLoading(false);
    } catch(err) {
        setError('Error fetching post.');
        setLoading(false);
    }
  };

  fetchPost();
}, [id]);

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/posts/${id}`, { title, content });
      navigate(`/post/${id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to update post.');
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
      <div className='container'>
          <h3>Edit Post</h3>
          <form onSubmit={handleSubmit}>
              <input 
              className='form-control mb-2'
              placeholder='Title' 
              value={title}
              onChange={e => setTitle(e.target.value)} />
  
              <CKEditor 
              editor = {ClassicEditor} 
              data = {content}
              onChange = {(e, editor) => setContent(editor.getData())} />
  
              <button className="btn btn-success mt-3">Post</button>
          </form>
      </div>
    )
}

export default EditPost;

