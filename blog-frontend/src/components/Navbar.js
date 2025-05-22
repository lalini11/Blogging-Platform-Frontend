import React from 'react'
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
        <div className='container'>
            <Link className='navbar-brand' to='/'>BlogApp</Link>
            <div className="navbar-nav ms-auto">
                <Link className='nav-link nav-link-custom' to='/'>Home</Link>
                {isLoggedIn && <Link className='nav-link nav-link-custom' to= '/dashboard'>My Posts</Link>}
                {isLoggedIn && <Link className='nav-link nav-link-custom' to= '/new'>New Post</Link>}
                {!isLoggedIn && <Link className='nav-link nav-link-custom' to= '/login'>login</Link>}
                {!isLoggedIn && <Link className='nav-link nav-link-custom' to= '/signup'>signup</Link>}
                {isLoggedIn && <button className='nav-link btn btn-link p-0 nav-link-custom' onClick={logout}>Logout</button>}
            </div>
        </div>
    </nav>
  )
}

export default Navbar;