import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const baseQuery = fetchBaseQuery({
  // baseUrl: '', // in dev
  baseUrl: 'https://mern-auth-production-5596.up.railway.app', // in prod
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token
    // const token = JSON.parse(localStorage.getItem('token'))
    const token = Cookies.get('jwt')
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
