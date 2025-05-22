import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await API.post('/posts', { title, content });
        navigate('/');
    };

  return (
    <div className='container'>
        <h3>Create Post</h3>
        <form onSubmit={handleSubmit}>
            <input 
            className='form-control mb-2'
            placeholder='Title' 
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

export default NewPost;
