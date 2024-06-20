import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editPost, getposts } from "../feature/postSlice";
import { useDeletePostMutation, useGetAllPostsMutation, useGetSpecificPostsMutation } from "../service/postApi";

function GetAllPost() {
  const dispatch = useDispatch();
  const [getAllposts, { isLoading, isError }] = useGetAllPostsMutation();

  const getPosts = async () => {
    try {
      const result = await getAllposts().unwrap();
      dispatch(getposts(result));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const [getSpecificPost, {}] = useGetSpecificPostsMutation()
  const SubmitUpdate = async (id) =>{
    const post = await getSpecificPost({id}).unwrap()
    dispatch(editPost({key: "body", value: post['body']}))
    dispatch(editPost({key: "id", value: post['id']}))
    dispatch(editPost({key: "title", value: post['title']}))
    dispatch(editPost({key: "userId", value: post['userId']}))
  }

  const { posts } = useSelector((state) => state.post);

  const [DeletePOST, {}] = useDeletePostMutation()
  const handleDeletePOST = async(id) => {
    const res = await DeletePOST({id: id}).unwrap()
    console.log(res)
  }

  return (
    <div className="w-8/12 px-3 border-2 border-stone-200 ml-2 rounded-lg">
      <div className="flex flex-row justify-between px-3 py-4 border-b-2">
        <h1 className="text-3xl font-bold">POSTS</h1>
        <h5 className="text-xl">Total Response: {posts.length}</h5>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading posts.</p>}
        {posts.map((post) => (
          <div
            key={post.id}
            
            className="cursor-pointer rounded overflow-hidden shadow-lg border-1 border-black"
          >
            <div className="px-6 py-4">
              <div onClick={() => SubmitUpdate(post.id)} className="font-bold text-xl mb-2 capitalize">{post.title}</div>
              <button onClick={() => handleDeletePOST(post.id)} className="bg-red-500 p-2 rounded-lg text-white">Delete</button>
              <p className="text-gray-700 text-base">{post.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetAllPost;
