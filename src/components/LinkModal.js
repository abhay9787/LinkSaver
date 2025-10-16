import React, { useState } from 'react';

function LinkModal({ open, onClose, onSave, initial }) {
  console.log("initial", initial);
  const [url, setUrl] = useState(initial?.url || '');
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [tags, setTags] = useState(initial?.tags ? initial.tags.join(', ') : '');
  const [urlError, setUrlError] = useState('');

  console.log(url, title, description, tags, );
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 transition-opacity animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">×</button>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{initial ? 'Edit Link' : 'Add Link'}</h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            let formattedUrl = url.trim();
            if (!/^https?:\/\//i.test(formattedUrl)) {
              if (!/^www\./i.test(formattedUrl)) {
                formattedUrl = 'www.' + formattedUrl;
              }
              formattedUrl = 'https://' + formattedUrl;
            }
            // Simple URL validation
            if (!/^https?:\/\/.+\..+/.test(formattedUrl)) {
              setUrlError('Enter a valid URL');
              return;
            }
            setUrlError('');
            onSave({ url: formattedUrl, title, description, tags: tags.split(',').map(t => t.trim()).filter(Boolean) });
          }}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder="Title"
            value={initial?.title}
            onChange={e => setTitle(e.target.value)}
            required
            className="rounded-xl text-black border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm transition duration-300 ease-in-out focus:scale-105"
          />
          <div className="flex flex-col gap-2">
            {urlError && <div className="text-red-500 text-sm font-medium mb-1">{urlError}</div>}
            <input
              type="url"
              placeholder="URL"
              value={initial?.url }
              onChange={e => { setUrl(e.target.value); setUrlError(''); }}
              required
              pattern="https?://.+|.+\.com|.+\.net|.+\.org|.+\.io|.+\.in|.+\.co|.+\.dev|.+\.app|.+\.xyz|.+\.ai"
              className="rounded-xl border text-black border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm transition duration-300 ease-in-out focus:scale-105"
            />
          </div>
          <textarea
            placeholder="Description"
            value={initial?.description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="rounded-xl border text-black border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm resize-none transition duration-300 ease-in-out focus:scale-105"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={initial?.tags}
            onChange={e => setTags(e.target.value)}
            className="rounded-xl border text-black border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm transition duration-300 ease-in-out focus:scale-105"
          />
          <button type="submit" className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold shadow hover:bg-gray-800 transition duration-300 ease-in-out hover:scale-105 focus:ring-2 focus:ring-gray-300">{initial ? 'Save Changes' : 'Add Link'}</button>
        </form>
      </div>
    </div>
  );
}

export default LinkModal;
