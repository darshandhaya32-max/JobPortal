import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import PostForm from "./Forms/PostForm";
import { jwtDecode } from "jwt-decode";

const Update = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
      
        const res = await axios.get(`${apiUrl}/home/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(res.data);
      } catch (error) {
        console.error("❌ Fetch error:", error.message);
      }
    };
    fetchPost();
  }, [id]);
   const token = localStorage.getItem("token");
    let userName = null;
    let userId = null;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        userName = decoded.userName;
        userId = decoded.id;
      } catch (error) {
        console.error("Invalid token:", error);
        
      }
    }

  const handleSubmit = (e) => {
    e.preventDefault();

    const Postitem = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.put(
          `${apiUrl}/edit/${id}`,
          {
            title: post.title,
            content: post.content,
            author: userName,
            authorId:userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(res.data.message);
        toast.success("poast Updated successfully");
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

export default Update;
