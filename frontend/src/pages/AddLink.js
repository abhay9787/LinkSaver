import React, { useState } from 'react';
import axios from 'axios';

function AddLink() {
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/links', { url, tags: tags.split(',') }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Link added!');
    } catch (err) {
      setMessage('Error adding link');
    }
  };

  return (
    <div>
      <h2>Add Link</h2>
      <form onSubmit={handleSubmit}>
        <input type="url" placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} required />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddLink;
