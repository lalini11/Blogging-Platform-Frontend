import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewPost from './pages/NewPost';
import Dashboard from './pages/Dashboard';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';


const App = () => {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/new' element={<NewPost/>} />
      <Route path='/edit/:id' element={<EditPost/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/post/:id' element={<PostDetail/>} />
    </Routes>
  </Router>
  )
}

export default App;