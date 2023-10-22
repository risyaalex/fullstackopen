import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import loginService from './services/login';
import blogService from './services/blogs';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

 useEffect(() => {
  const savedUser = window.localStorage.getItem("loggedUser");
  if (savedUser) {
    const userData = JSON.parse(savedUser);
    if (userData.expirationTime > new Date().getTime()) {
      setUser(userData.user);
      blogService.setToken(userData.user.token);
    } else {
      setUser(null);
      blogService.setToken(null);
      window.localStorage.removeItem("loggedUser");
    }
  }

  blogService.getAll().then((blogs) => setBlogs(blogs));
 }, []);
  
useEffect(() => {
  if (user) {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }
}, [user]);



const handleLogin = async (event) => {
  event.preventDefault();
  try {
    const user = await loginService.login({
      username,
      password,
    });
    blogService.setToken(user.token);

    const expirationTime = new Date().getTime() + 60 * 60 * 1000;
    const userData = {
      user,
      expirationTime,
    };
    window.localStorage.setItem("loggedUser", JSON.stringify(userData));

    setUser(user);
    setUsername("");
    setPassword("");
    setMessage({
      text: `${user.name} logged in.`,
      type: "success",
    });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  } catch (exception) {
    setMessage({
      text: "Wrong username or password. Please try again.",
      type: "error",
    });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }
};

  
const handleLogout = () => {
  window.localStorage.removeItem("loggedUser");
  
  setUser(null);
  blogService.setToken(null);

  setMessage({
    text: "Logout successful.",
    type: "success",
  });
  setTimeout(() => {
    setMessage(null);
  }, 5000);
};

  
  const renderLoginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  );  

  const renderLogoutForm = () => (
    <div>
      <p>{user.name} logged in!</p>
      <p><button onClick={() => handleLogout()}>Logout</button></p>
    </div>
  );

  const createBlog = async (newBlog) => {
  try {
    const response = await blogService.create(newBlog);
    const blogWithUser = { ...response, user: user }; 
    setBlogs([...blogs, blogWithUser]); 

    setMessage({
      text: `Blog created successfully`,
      type: "success",
    });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  } catch (error) {
      setMessage({
        text: `Failed to create a new blog: ${error.response.data.error}`,
        type: "error",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

   const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);


  return (
    <div>
      <h1>Blogs</h1>

      {user ? (
        renderLogoutForm()
      ) : (
        renderLoginForm()
      )}
      {(message) ? <Notification notificationMessage={message} /> : ''}
      {user && (
        <div>
          <Togglable buttonLabel="Create New Blog">
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <ul>
            {sortedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} setMessage={setMessage} currentUser={user} setBlogs={setBlogs} blogs={blogs} />
            ))}

          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
