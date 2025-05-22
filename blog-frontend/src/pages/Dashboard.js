import React, { useEffect, useState } from 'react'
import API from '../api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [posts, setPosts] =  useState([]);

    useEffect(() => {
        API.get('/posts').then(response => {
            const userId =  JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
            setPosts(response.data.filter(p => p.UserId === userId));
        });
    }, []);

    const deletePost = async (id) => {
        await API.delete(`/posts/${id}`);
        setPosts(posts.filter(p => p.id !== id));
    };

  return (
    <div className='container'>
        <h3>My Posts</h3> 
        {posts.map(p => (
            <div key = {p.id} className='card mb-2'>
                <div className='card-body'>
                    <h5>{p.title}</h5>
                    <Link to= {`/edit/${p.id}`} 
                    className='btn btn-sm btn-warning me-2'>
                        Edit
                    </Link>

                    <button 
                    className='btn btn-sm btn-danger'
                    onClick={() => deletePost(p.id)}>
                        Delete
                    </button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Dashboard;