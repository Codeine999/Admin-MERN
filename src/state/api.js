import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customrs", "Transaction", "Blog", "Auth"
    ],

    endpoints: (build) => ({
      register: build.mutation({
        query: (formData) => ({
          url: "auth/register",
          method: "POST",
          body: formData,
        }),
      }),
      login: build.mutation({
        query: ({ email, password }) => ({
          url: 'auth/login',
          method: 'POST',
          body: { email, password },
        }),
      }),
        
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"],
        }),
        getTransaction: build.query({
            query: () => "client/transaction",
            providesTags: ["Transaction"],
        }),
        getBlogs: build.query({
            query: () => "blog",
            providesTags: ["Blog"],
        }),
        getBlogById: build.query({
            query: (id) => `blog/${id}`,
            providesTags: ["Blog"],
        }),
        createBlog: build.mutation({
            query: (newBlog) => ({
              url: "blog",
              method: "POST",
              body: newBlog,
            }),
            invalidatesTags: ["Blog"],
        }),
        updateBlog: build.mutation({
            query: ({ id, updatedBlog }) => ({
              url: `blog/${id}`,
              method: 'PUT',
              body: updatedBlog,
            }),
            invalidatesTags: ['Blog'],
          }),
        deletePost: build.mutation({
            query: (id) => ({
              url: `blog/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ["Blog"],
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation,  useGetProductsQuery, useGetCustomersQuery, useGetTransactionQuery,
    useGetBlogsQuery, useGetBlogByIdQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeletePostMutation } = api;