import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import styles from './Blog.styles.css'

const Blog = ({ blog, setMessage, currentUser, setBlogs, blogs }) => {
  const [isCurrentUserTheAuthor, setIsCurrentUserTheAuthor] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [localBlog, setLocalBlog] = useState(blog); 
  
  useEffect(() => {
  console.log("useEffect triggered");
  
  if (localBlog.user && currentUser.username) {
    let newState = false;

    if (typeof localBlog.user === 'object' && localBlog.user.username) {
      newState = localBlog.user.username === currentUser.username;
    } else if (typeof localBlog.user === 'string' && currentUser.id) {
      newState = localBlog.user === currentUser.id;
    }
    
    setIsCurrentUserTheAuthor(newState);
  }
  
}, [localBlog, currentUser]); 


  const checkIsCurrentUserTheAuthor = () => {
  if (typeof localBlog.user === 'object') {
    return localBlog.user.username === currentUser.username;
  } else {
    return localBlog.user === currentUser.id;
  }
};


  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLike = async () => {
    const updatedBlog = {
      ...localBlog,  
      likes: localBlog.likes + 1,  
    };

    try {
      console.log('Updated blog data:', updatedBlog);
      const updated = await blogService.update(localBlog.id, updatedBlog);  
      setLocalBlog(updated);  
    } catch (error) {
      console.error('Error updating likes:', error);
      setMessage({  
        text: 'Failed to update number of likes',
        type: 'error',
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleDelete = async () => {
  if (window.confirm(`Are you sure you want to delete the blog "${localBlog.title}"?`)) {
    try {
      await blogService.deleteBlog(localBlog.id);
      setBlogs(blogs.filter((blog) => blog.id !== localBlog.id));
      setMessage({
        text: `Blog "${localBlog.title}" has been deleted successfully`,
        type: "success",
      });
    } catch (error) {
      setMessage({
        text: `Failed to delete blog "${localBlog.title}"`,
        type: "error",
      });
    }
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }
};

// console.log('Current blog state:', localBlog);
// console.log('Current user:', currentUser);

//   console.log("localBlog.user:", localBlog.user);
  //   console.log("isCurrentUserTheAuthor:", isCurrentUserTheAuthor);
  console.log("Final check isCurrentUserTheAuthor:", isCurrentUserTheAuthor);
  console.log("Current user object:", currentUser);


  return (
    <div className='blogStyle'>
      <div>
        {localBlog.title} <button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button> 
      </div>
      {showDetails && (
        <div>
          <div>URL: {localBlog.url}</div> 
          <div>Likes {localBlog.likes} <button onClick={handleLike}>like</button></div> 
          <div>Author: {localBlog.author}</div> 
          
           {isCurrentUserTheAuthor && <button onClick={handleDelete}>Delete</button>}

        </div>
      )}
    </div>
  );
};

export default Blog;
