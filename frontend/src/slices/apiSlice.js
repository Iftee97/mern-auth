import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

// keep empty string '' in dev because we're using a proxy in vite config
// but use baseUrl: 'https://mern-auth-production-5596.up.railway.app' in prod
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://mern-auth-production-5596.up.railway.app',
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().token
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // we'll inject the endpoints from another file
  }),
})
