import React, { useState } from 'react';
import blogService from '../services/blogs';
import styles from './Blog.styles.css'

const Blog = ({ blog, setMessage }) => { 
  const [showDetails, setShowDetails] = useState(false);
  const [localBlog, setLocalBlog] = useState(blog);  

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
        </div>
      )}
    </div>
  );
};

export default Blog;
