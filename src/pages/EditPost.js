import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const found = posts.find(p => p.id === id);
    if (found) {
      setPost(found);
      setTitle(found.title);
      setContent(found.content);
    }
  }, [id]);

  const handleUpdate = e => {
    e.preventDefault();
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updated = posts.map(p =>
      p.id === id ? { ...p, title, content } : p
    );
    localStorage.setItem("posts", JSON.stringify(updated));
    navigate("/dashboard");
  };

  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          rows="10"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
