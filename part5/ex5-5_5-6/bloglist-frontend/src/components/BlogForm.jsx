import React, { useState } from 'react';

const FormBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '', likes: 0 });
  };

  return (
    <div>
      <h2>Create New Blog</h2>
          <form onSubmit={handleSubmit}>
              <div>
                    <label htmlFor='title'>Title: </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={newBlog.title}
                        onChange={handleInputChange}
                    />
                  </div>
              <div>
                  <label htmlFor='author'>Author: </label>         
                    <input 
                        type="text"
                        name="author"
                        id="author"
                        value={newBlog.author}
                        onChange={handleInputChange}
                    />
                </div>
              <div>
                <label htmlFor='url'>URL: </label>
                <input
                    type="text"
                    name="url"
                    id="url"
                    value={newBlog.url}
                    onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor='likes'>Likes: </label>
                <input
                    type="number"
                    id="likes"
                    name="likes"
                    value={newBlog.likes}
                    onChange={handleInputChange}
                />
                </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default FormBlog;
