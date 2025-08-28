import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DisplayForm from "./Forms/DisplayForm";

const Home = () => {
  const [data, setData] = useState([]);
          const apiUrl = process.env.VITE_API_URL;
console.log(apiUrl)
  useEffect(() => {
    const fetchitem = async () => {
      try {
        const res = await axios.get(`${apiUrl}/home`);
        setData(res.data || []);
      } catch (error) {
        console.error("❌ Fetch error:", error.message);
      }
    };
    fetchitem();
  }, []);

  
  const handleDelete = (id) => {
    const conformation = window.confirm(
      "Do you Really whant to Delete this Post ⁉️"
    );
    const Postdelete = async () => {
      try {
        if (conformation) {
          const token = localStorage.getItem("token");
          const result = await axios.delete(
            `${apiUrl}/delete/${id}`,
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
  );
};

export default Home;
