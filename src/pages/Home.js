import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  // Show all posts from localStorage
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Mini Blog System</h1>
        <nav>
          {!user ? (
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="space-x-4 flex items-center">
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </header>

      <main>
        <h2 className="text-2xl font-semibold mb-4">All Blog Posts</h2>
        {posts.length === 0 ? (
          <p>No blog posts yet.</p>
        ) : (
          <ul className="space-y-6">
            {posts
              .slice()
              .reverse()
              .map(post => (
                <li
                  key={post.id}
                  className="p-4 bg-white rounded shadow-md"
                >
                  <Link
                    to={`/post/${post.id}`}
                    className="text-xl font-semibold text-blue-600 hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-700 mt-2">{post.content.slice(0, 150)}...</p>
                  <p className="text-gray-500 text-sm mt-1">
                    By {post.author} | {new Date(post.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
          </ul>
        )}
      </main>
    </div>
  );
}
