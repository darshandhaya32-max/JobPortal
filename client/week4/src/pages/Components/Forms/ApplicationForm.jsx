import React from 'react'

const ApplicationForm = ({singlePost,setApply,apply,handleSubmit}) => {
  return (
   <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 flex flex-col ">
      <h2>
        <b>Job Title: </b>
        {singlePost.title}
      </h2>
      <p>
        <b>Job Discription: </b>
        {singlePost.content}
      </p>
      <p>
        <b>HR: </b> {singlePost.author}
      </p>
      <h1>Application Form</h1>
      <form className=" mt-20 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Application Form
        </h2>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-semibold text-gray-600"
          >
            First Name
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter post title"
            className="px-3 py-2 border rounded-lg "
            onChange={(e) => setApply({ ...apply, firstName: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-semibold text-gray-600"
          >
            Last Name
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter post title"
            className="px-3 py-2 border rounded-lg "
            onChange={(e) => setApply({ ...apply, lastName: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-semibold text-gray-600"
          >
            Highest Education
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter post title"
            className="px-3 py-2 border rounded-lg "
            onChange={(e) =>
              setApply({ ...apply, qualification: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-semibold text-gray-600"
          >
            Year of passed out
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter post title"
            className="px-3 py-2 border rounded-lg "
            onChange={(e) =>
              setApply({ ...apply, yearOfPassing: e.target.value })
            }
          />
        </div>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-400 text-white font-medium rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ApplicationForm