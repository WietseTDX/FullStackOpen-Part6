import { createSlice } from "@reduxjs/toolkit"

import { verifyAnecdoteStructure, anecdoteAsObject } from './anecdoteReducer.helper'
import { addAnecdoteThunk, fetchAnecdotesDBThunk, updateAnecdoteVotesThunk } from './anecdoteReducer.thunks'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]
const anecdotesAtStart = [
  // 'If it hurts, do it more often',
  // 'Adding manpower to a late software project makes it later!',
  // 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  // 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  // 'Premature optimization is the root of all evil.',
  // 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const initialState = anecdotesAtStart.map(anecdoteAsObject)

const ancedoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    toggleVoteOf(state, action) {
      const currentAnecdote = state.find(anecdote => anecdote.id === action.payload)
      if (!currentAnecdote) return state

      const updatedAnecdote = { ...currentAnecdote, votes: currentAnecdote.votes + 1 }

      return state.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    },
    addAnecdote(state, action) {
      const newAnecdote = anecdoteAsObject(action.payload.content, action.payload.id)
      // console.log("here", newAnecdote)
      state.push(newAnecdote)
    },
    setAnecdotes(state, action) {
      if (!verifyAnecdoteStructure(action.payload)) return
      return action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addAnecdoteThunk.fulfilled, (state, action) => {
      console.log('Anecdote successfully saved:', action.payload);
    });
    builder.addCase(updateAnecdoteVotesThunk.fulfilled, (state, action) => {
      console.log('Anecdote successfully added vote:', action.payload);
    });
    builder.addCase(fetchAnecdotesDBThunk.fulfilled, (state, action) => {
      console.log('Anecdotes successfully fetched:', action.payload);
      return action.payload
    });
  }
})

export const { addAnecdote, toggleVoteOf, setAnecdotes } = ancedoteSlice.actions
export default ancedoteSlice.reducer
