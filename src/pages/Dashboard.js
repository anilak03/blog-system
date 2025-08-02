import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) return;
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const userPosts = allPosts.filter(post => post.author === user.username);
    setPosts(userPosts);
  }, [user]);

  const handleDelete = id => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    let allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    allPosts = allPosts.filter(post => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(allPosts));
    setPosts(allPosts.filter(post => post.author === user.username));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Blog Posts</h1>
        <button
          onClick={() => navigate("/new")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <p>You have no posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li
              key={post.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <Link
                  to={`/post/${post.id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-gray-600 text-sm mt-1">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/edit/${post.id}`)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
