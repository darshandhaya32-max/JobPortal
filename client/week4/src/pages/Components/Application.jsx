import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApplicationForm from "./Forms/ApplicationForm";

const Application = () => {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState("");
  const [apply, setApply] = useState({
    firstName: "",
    lastName: "",
    qualification: "",
    yearOfPassing: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchsingle = async () => {
      try {
        const result = await axios.get(`${apiUrl}/home/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSinglePost(result.data || []);
      } catch (error) {
        console.error("❌ Fetch error:", error.message);
      }
    };
    fetchsingle();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("❌ You must be logged in to submit the application");
      return;
    }
    if (
      !apply.firstName ||
      !apply.lastName ||
      !apply.qualification ||
      !apply.yearOfPassing
    ) {
      toast.error("❌ Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post(
        `${apiUrl}/application`,
        {
          firstname: apply.firstName,
          lastname: apply.lastName,
          qualification: apply.qualification,
          yop: apply.yearOfPassing,
          internId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Application submitted successfully 👍");
      console.log(res.data.message);
      navigate("/");
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      if (status === 401) {
        toast.error("❌ Invalid or expired token. Please login again.");
      } else if (status === 400) {
        toast.error("❌ Validation error. Please check required fields.");
      } else {
        toast.error("❌ Something went wrong. Please try again.");
      }

      console.error("❌ Submit error:", message);
    }
  };

  return (
    <div>
      <ApplicationForm
        singlePost={singlePost}
        setApply={setApply}
        apply={apply}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Application;
