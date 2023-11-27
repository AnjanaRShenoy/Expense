import {  USERS_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";

export const userAdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    expense:builder.mutation({
      query:(data) => ({
        url: `${USERS_URL}/addExpense`,
        method: "POST",
        body: data,
      }),
    }),
    getData:builder.query({
      query:()=>({
        url: `${USERS_URL}/data`,
        method: "GET",
      })
    })
    
   
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useExpenseMutation,
  useGetDataQuery
} = userAdminApiSlice;
