import React, { useState,useEffect } from 'react'
import DisplayForm from './Forms/DisplayForm'
import { useParams } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyPosts = () => {
     const [data, setData] = useState([]);
     const {id} = useParams();
  useEffect(() => {
    const fetchitem = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/myposts/${id}`);
        setData(res.data || []);
      } catch (error) {
        console.error("❌ Fetch error:", error.message);
      }
    };
    fetchitem();
  }, [id]);
  const handleDelete = (id) => {
    const conformation = window.confirm(
      "Do you Really whant to Delete this Post ⁉️"
    );
    const Postdelete = async () => {
      try {
        if (conformation) {
          const token = localStorage.getItem("token");
          const result = await axios.delete(
            `http://localhost:3000/api/delete/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setData((prev) => prev.filter((post) => post.id !== id));
          toast.success("Post deleted successfully!");
        }
      } catch (error) {
        console.error("❌ Fetch error:", error.message);
        toast.error("Failed to delete post!");
      }
    };
    Postdelete();
  };
  return (
    <div>
         <DisplayForm handleDelete={handleDelete} data={data} />
    </div>
  )
}

export default MyPosts