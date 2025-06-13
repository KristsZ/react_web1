import React, { useState, useEffect } from 'react';

export default function PostForm(props) {
  const [formData, setFormData] = useState({
    post_title: '',
    post_content: ''
  });

  useEffect(() => {
    if (props.formasDati) {
      // Ja formasDati ir masīvs (piem. [{...}]), ņem pirmo elementu
      const data = Array.isArray(props.formasDati) ? props.formasDati[0] : props.formasDati;

      if (data && (data.post_title !== undefined || data.post_content !== undefined)) {
        setFormData({
          post_title: data.post_title || '',
          post_content: data.post_content || ''
        });
      } else {
        // Ja jauns posts vai nav datu
        setFormData({
          post_title: '',
          post_content: ''
        });
      }
    }
  }, [props.formasDati]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const savePosts = async () => {
    let postFormData = new FormData();
    postFormData.append('post_title', formData.post_title);
    postFormData.append('post_content', formData.post_content);

    let url = '';
    let method = 'POST';

    if (props.editFormId) {
      // Labots URL atbilstoši CodeIgniter maršrutiem
      url = `http://localhost:8080/posts/update/${props.editFormId}`;
    } else {
      url = 'http://localhost:8080/posts/create';
    }

    try {
      let response = await fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
        },
        body: postFormData
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      await response.json();
      props.closeModal();
      props.reload();
    } catch (err) {
      console.error("Saglabāšana neizdevās:", err);
      alert("Kļūda saglabājot ziņu.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    savePosts();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
      <div>
        <label htmlFor="post_title" className="block text-lg font-medium text-gray-700">
          Nosaukums
        </label>
        <input
          type="text"
          id="post_title"
          name="post_title"
          value={formData.post_title}
          onChange={handleChange}
          className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="post_content" className="block text-lg font-medium text-gray-700">
          Saturs
        </label>
        <textarea
          id="post_content"
          name="post_content"
          rows="6"
          value={formData.post_content}
          onChange={handleChange}
          className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
      >
        {props.editFormId ? 'Saglabāt izmaiņas' : 'Publicēt'}
      </button>
    </form>
  );
}
