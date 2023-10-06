import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
      blogService.setToken(user.token); // Устанавливаем токен для доступа к блогам
    }

    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token); 
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); 
    blogService.setToken(null); 
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

  return (
    <div>
      <h1>Blogs</h1>

      {user ? (
        renderLogoutForm()
      ) : (
        renderLoginForm()
      )}

      {user && (
        <div>
          {errorMessage && <Notification message={errorMessage} />}
          <ul>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
