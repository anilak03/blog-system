import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const found = posts.find(p => p.id === id);
    if (found) setPost(found);
  }, [id]);

  if (!post) return <p className="p-6">Post not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">
        By {post.author} on {new Date(post.createdAt).toLocaleString()}
      </p>
      <div className="whitespace-pre-wrap text-lg">{post.content}</div>
    </div>
  );
}
