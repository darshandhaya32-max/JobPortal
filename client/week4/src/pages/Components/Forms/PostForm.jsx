import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";

const PostForm = ({ handleSubmit, setPost, post }) => {
  const token = localStorage.getItem("token");
  let userName = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.userName;
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }

  return (
    <div>
      {" "}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Create New Post
        </h2>

        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-semibold text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={post.title}
            placeholder="Enter post title"
            className="px-3 py-2 border rounded-lg "
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="content"
            className="mb-1 text-sm font-semibold text-gray-600"
          >
            Content
          </label>
          <textarea
            id="content"
            value={post.content}
            placeholder="Enter post content"
            rows="3"
            className="px-3 py-2 border rounded-lg "
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="author"
            className="mb-1 text-sm font-semibold text-gray-600"
          >
            Author
          </label>
          {userName}
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
