import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddLink({ token, initialData = null, onSave, onClose, onDelete }) {
  const [url, setUrl] = useState(initialData?.url || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [tags, setTags] = useState(initialData?.tags ? initialData.tags.join(', ') : '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setUrl(initialData?.url || '');
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
    setTags(initialData?.tags ? initialData.tags.join(', ') : '');
    setMessage('');
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        url: url.trim(),
        title: title.trim(),
        description: description.trim(),
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (initialData?._id) {
        const res = await axios.put(`http://localhost:8080/api/links/${initialData._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onSave(res.data);
        setMessage('Link updated!');
      } else {
        const res = await axios.post('http://localhost:8080/api/links', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onSave(res.data);
        setMessage('Link added!');
      }

      onClose();
    } catch (err) {
      setMessage('Error saving link');
    }
  };

  const handleDelete = async () => {
    if (!initialData?._id) return;
    try {
      await axios.delete(`http://localhost:8080/api/links/${initialData._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(initialData._id);
      onClose();
    } catch (err) {
      setMessage('Error deleting link');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">×</button>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{initialData ? 'Edit Link' : 'Add Link'}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="rounded-xl border text-black border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm transition"
          />
          <input
            type="url"
            placeholder="URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
            className="rounded-xl border text-black border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm transition"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="rounded-xl border text-black border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm resize-none transition"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="rounded-xl border text-black border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm transition"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gray-900 text-white font-semibold shadow hover:bg-gray-800 transition"
            >
              {initialData ? 'Save Changes' : 'Add Link'}
            </button>
            {initialData?._id && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold shadow hover:bg-red-500 transition"
              >
                Delete
              </button>
            )}
          </div>
        </form>
        {message && <p className="mt-3 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default AddLink;