import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload.toLowerCase() 
    }
  }
})

export default filterSlice.reducer

export const { setFilter } = filterSlice.actions
