import React, { useState } from 'react';
import styles from './Blog.styles.css'


const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className='blogStyle'>
      <div>
        {blog.title} <button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {showDetails && (
        <div>
          <div>URL: {blog.url}</div>
          <div>Likes {blog.likes} <button>like</button></div>
          <div>Author: {blog.author}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
