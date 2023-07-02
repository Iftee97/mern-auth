import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: '' }) // empty because we're using a proxy in vite config

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // we'll inject the endpoints from another file
  }),
})
