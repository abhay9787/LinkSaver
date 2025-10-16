import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddLink from './AddLink';
import { FaCopy, FaTrash, FaFileImport, FaFileExport } from 'react-icons/fa';

function Dashboard() {
  const [links, setLinks] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editLink, setEditLink] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8080/api/links', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setLinks(res.data))
      .catch(() => setLinks([]));
  }, [token]);

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(search.toLowerCase()) ||
    link.description.toLowerCase().includes(search.toLowerCase()) ||
    (link.tags && link.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
  );

  const handleAddOrEditLink = (link) => {
    const exists = links.find(l => l._id === link._id);
    if (exists) {
      setLinks(links.map(l => l._id === link._id ? link : l));
    } else {
      setLinks([...links, link]);
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL copied!');
  };

  const handleOpen = (url) => {
    const link = url.startsWith('http') ? url : 'https://' + url;
    window.open(link, '_blank');
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/links/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLinks(links.filter(link => link._id !== _id));
      alert('Link deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error deleting link');
    }
  };

  // --------- Export links as JSON ----------
  const handleExport = () => {
    const dataStr = JSON.stringify(links, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "links_export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // --------- Import links from JSON ----------
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedLinks = JSON.parse(event.target.result);

        // POST each link to the backend
        const promises = importedLinks.map(link =>
          axios.post('http://localhost:8080/api/links', link, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        const results = await Promise.all(promises);
        const newLinks = results.map(r => r.data);
        setLinks([...links, ...newLinks]);
        alert('Links imported successfully!');
      } catch (err) {
        console.error(err);
        alert('Failed to import links. Make sure the file is valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-[80vh] bg-[#111111] py-10 px-4">
      <h2 className="text-4xl text-gray-100 mb-8 text-center">Your Saved Links</h2>

      <div className="flex justify-center mb-10 gap-4 flex-wrap">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search your links…"
          className="w-full max-w-lg px-6 py-3 text-black rounded-full border border-gray-200 shadow text-lg bg-gray-50 placeholder-gray-400"
        />
        <button
          onClick={() => { setModalOpen(true); setEditLink(null); }}
          className="px-6 py-3 rounded-full bg-gray-700 text-white flex items-center gap-2"
        >
          Add Link
        </button>

        <button
          onClick={handleExport}
          className="px-6 py-3 rounded-full bg-green-600 text-white flex items-center gap-2"
        >
          <FaFileExport /> Export
        </button>

        <label className="px-6 py-3 rounded-full bg-blue-600 text-white flex items-center gap-2 cursor-pointer">
          <FaFileImport /> Import
          <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredLinks.map(link => (
          <div key={link._id} className="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow hover:shadow-xl">
            
            {/* Preview window */}
            <div className="w-full h-40 bg-gray-100 rounded-xl overflow-hidden flex justify-center items-center">
              <iframe
                src={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                title={link.title}
                className="w-full h-full border-0"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML =
                    `<img src='https://www.google.com/s2/favicons?sz=128&domain_url=${link.url}' class='w-12 h-12' />`;
                }}
              ></iframe>
            </div>

            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-gray-900">{link.title}</a>
            <p className="text-black">{link.description}</p>
            <div className="flex flex-wrap gap-2">
              {link.tags && link.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-sm">{tag}</span>
              ))}
            </div>

            <div className="flex gap-2 mt-2">
              <button onClick={() => setModalOpen(true) || setEditLink(link)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">Edit</button>
              <button onClick={() => handleCopy(link.url)} className="px-4 py-2 bg-green-100 text-green-600 rounded-full">Copy</button>
              <button onClick={() => handleOpen(link.url)} className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full">Open</button>
              <button
                onClick={() => handleDelete(link._id)}
                className="px-6 py-2 rounded-full flex gap-2 justify-center items-center bg-red-500 text-white"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <AddLink
          token={token}
          initialData={editLink}
          onSave={handleAddOrEditLink}
          onClose={() => { setModalOpen(false); setEditLink(null); }}
        />
      )}
    </div>
  );
}

export default Dashboard;