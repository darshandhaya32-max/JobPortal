import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import PostForm from "./Forms/PostForm";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const CreateJobPost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
  });
    const apiUrl = process.env.VITE_API_URL;

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
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const Postitem = async () => {
      try {
        const token = localStorage.getItem("token");
        let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = parseInt(decoded.id);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }
        const res = await axios.post(
          `${apiUrl}/posts`,
          {
            title: post.title,
            content: post.content,
            author: userName,
            authorId:userId
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(res.data.message);
        toast.success("poast added successfully");
        setPost({ title: "", content: "", author: "" });
      } catch (error) {
        console.error("❌ Fetch error:", error.message);
        setMessage("Error: " + error.message);
      }
    };
    Postitem();
    navigate("/");
  };

  return (
    <div>
      <PostForm handleSubmit={handleSubmit} setPost={setPost} post={post} />
      {message && (
        <p className="text-center mt-4 font-medium text-green-600">{message}</p>
      )}
    </div>
  );
};

export default CreateJobPost;
