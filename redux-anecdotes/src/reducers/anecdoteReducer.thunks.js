import { createAsyncThunk } from '@reduxjs/toolkit';
import { createNew, getAll, updateRecord } from '../services/anecdote.js'
import { anecdoteAsObject } from './anecdoteReducer.helper'

export const addAnecdoteThunk = createAsyncThunk(
  'anecdote/addAnecdoteThunk',
  async (props, thunkAPI) => {
    const { content, id } = props
    console.log("data", content, id)
    try {
      return await createNew(anecdoteAsObject(content, id));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const updateAnecdoteVotesThunk = createAsyncThunk(
  'anecdote/updateAnecdoteVotesThunk',
  async (id, thunkAPI) => {
    try {
      const currentAnecdote = thunkAPI.getState().anecdote.find(anecdote => anecdote.id === id)
      if (!currentAnecdote) throw -1
      return await updateRecord(id, currentAnecdote);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const fetchAnecdotesDBThunk = createAsyncThunk(
  'anecdote/fetchAnecdotesDBThunk',
  async (anecdote, thunkAPI) => {
    try {
      return await getAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)
