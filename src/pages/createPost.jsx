import React, { useState } from "react";
import { useCreatePostMutation } from "../service/postApi";


const CreatePost = () => {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [text, setText] = useState({
    title: "",
    body: "",
  });
  const [successful, setSuccessful] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Use the setter function to update state
    setText((prevText) => ({
      ...prevText,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", text.title);
      formData.append("body", text.body);
      formData.append("userId", 1); // Assuming userId needs to be appended

      const result = await createPost(formData).unwrap();
      if (result) {
        console.log("Post created:", result);
        setText({
          title: "",
          body: "",
        });
        setSuccessful(true);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      // Handle errors as needed
    }
  };

  return (
    <>
    <div className="px-3 bg-gray-100 border-2 border-gray-200 ml-2 rounded-lg h-fit">
      <div className="flex flex-row justify-between px-3 py-4 border-b-2">
        <h1 className="text-3xl">Create POST</h1>
      </div>
      <p className="opacity-30">
        <b>Important:</b> resource will not be really updated on the server but
        it will be faked as if.
      </p>
      <form
        autoComplete="off"
        className="mt-4 overflow-hidden"
        onSubmit={handleSubmitForm}
      >
        {isLoading && (
          <p className="my-3 p-2 bg-gray-300 text-center">Loading ...</p>
        )}
        {!isLoading && successful && (
          <div className="my-2 p-2 rounded bg-teal-500 text-white">
            Successfully created the Post
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="title" className="text-lg mb-1 block">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={text.title}
            placeholder="Title"
            onChange={handleInputChange}
            className="text-lg w-full p-1.5 rounded-lg border border-gray-500 focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="text-lg mb-1 block">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={text.body}
            placeholder="Content"
            onChange={handleInputChange}
            className="text-lg p-1.5 w-full rounded-lg border border-gray-500 focus:border-blue-400"
          />
        </div>
        <div className="border-t-2">
          <div className="flex justify-end p-2">
            <button
              type="submit"
              className="border p-2 rounded-lg border-red-500 text-red-500 hover:text-white hover:bg-red-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
      

    
    </>
    
  );
};

export default CreatePost;
