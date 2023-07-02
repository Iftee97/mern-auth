import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: 'https://mern-auth-production-5596.up.railway.app' }) // keep empty string in dev because we're using a proxy in vite config

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // we'll inject the endpoints from another file
  }),
})
