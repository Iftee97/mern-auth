import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
      state.token = action.payload.token
    },
    logout: (state, action) => {
      state.userInfo = null
      localStorage.removeItem('userInfo')
      state.token = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export const authReducer = authSlice.reducer
