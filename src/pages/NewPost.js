import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NewPost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      author: user.username,
      createdAt: new Date().toISOString(),
    };
    allPosts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(allPosts));
    navigate("/dashboard");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          rows="10"
          placeholder="Write your content here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
