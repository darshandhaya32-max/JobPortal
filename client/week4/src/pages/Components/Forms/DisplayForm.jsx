import React from 'react'
import { useNavigate } from 'react-router';
import { jwtDecode } from "jwt-decode";
import { Trash } from "lucide-react";
const DisplayForm = ({handleDelete,data})=> {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
  let userType = null;
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userType = decoded.userType;
      userId = decoded.id;
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }
  return (
    <div>
        <div>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8 flex flex-col relative "
            >
              {userType === "Recruiter" &&
                item.authentication?.id === userId && (
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1  cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash />
                    <span>Delete</span>
                  </div>
                )}
              <h2>
                <b>Title: </b>
                {item.title}
              </h2>
              <p>
                <b>Content: </b>
                {item.content}
              </p>
              <p>
                <b>Author: </b> {item.author}
              </p>
              {userType === "Recruiter" &&
                item.authentication?.id === userId && (
                  <button
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-400 text-white font-medium rounded-lg"
                    onClick={() => navigate(`/update/${item.id}`)}
                  >
                    Edit
                  </button>
                )}
              {userType === "Applicants" && (
                <button
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-400 text-white font-medium rounded-lg"
                  onClick={() => navigate(`/Apply/${item.id}`)}
                >
                  Apply
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
      </div>
  )
}

export default DisplayForm