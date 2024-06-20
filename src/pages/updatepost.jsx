import React, { useState, useEffect } from "react";
import { useUpdateSpecificPostMutation } from "../service/postApi";
import { useSelector, useDispatch } from "react-redux";
import { editPost } from "../feature/postSlice";

const UpdatePOST = () => {
  const dispatch = useDispatch();
  const { selected_post } = useSelector((state) => state.post);
  const [UpdatePost, { isLoading }] = useUpdateSpecificPostMutation();

  const [successful, setSuccessful] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(editPost({ key: name, value: value }));
  };

  useEffect(() => {
    setSuccessful(false)
  }, [selected_post])

  const [isError, setError] = useState("")
  const handleUpdateForm = async (e) => {
    e.preventDefault();
    try {
      if(selected_post.title === "" && selected_post.body ===""){
        setError("Title and Body cannot be empty")
      }
      else{
        const result = await UpdatePost({
          id: selected_post.id,
          formData: selected_post,
        });
        if (result) {
          console.log(result.data)
          setSuccessful(true);
        }
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      // Handle errors as needed
    }
  };

  return (
    <div className="px-3 border-2 border-gray-200 ml-2 rounded-lg h-fit">
      <div className="flex flex-row justify-between px-3 py-4 border-b-2">
        <h1 className="text-3xl">View & Edit POST</h1>
      </div>
      <p className="opacity-30">
        <b>Important:</b> resource will not be really updated on the server but
        it will be faked as if.
      </p>
      <form
        autoComplete="off"
        className="mt-4 overflow-hidden"
        onSubmit={handleUpdateForm}
      >
        {isError && (
          <p className="rounded my-3 p-2 bg-red-400 text-white text-center">{isError}</p>
        )}
        {isLoading && (
          <p className="my-3 p-2 bg-gray-300 text-center">Loading ...</p>
        )}
        {!isLoading && successful && (
          <div className="my-2 p-2 rounded bg-yellow-700 text-white">
            Successfully updated post with ID: {selected_post.id}
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
            value={selected_post.title}
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
            value={selected_post.body}
            placeholder="Content"
            onChange={handleInputChange}
            className="text-lg p-1.5 w-full rounded-lg border border-gray-500 focus:border-blue-400"
          />
        </div>
        <div className="border-t-2">
          <div className="flex justify-end p-2">
            <button
              type="submit"
              className="border p-2 rounded-lg border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePOST;
