import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: '',
  timeout: 0
}

const DEFAULT_TIMEOUT = 5

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.message = action.payload.message

      // Verify not undefined or zero, default to setting
      state.timeout = action.payload.timeout || DEFAULT_TIMEOUT     
    },
    disableNotification(state, action) {
      state.timeout = 0
    }
  }
})

export default notificationSlice.reducer
export const { showNotification, disableNotification } = notificationSlice.actions
