import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAllPosts: builder.mutation({
      query: () => ({
        url: `posts`,
        method: "GET",
      }),
    }),
    getSpecificPosts: builder.mutation({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: "GET",
      }),
    }),
    createPost: builder.mutation({
      query: ({ formData }) => ({
        url: `posts`,
        method: "POST",
        body: formData,
      }),
    }),
    updateSpecificPost: builder.mutation({
      query: ({ id, formData }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllPostsMutation,
  useGetSpecificPostsMutation,
  useCreatePostMutation,
  useUpdateSpecificPostMutation,
  useDeletePostMutation,
} = postApi;
