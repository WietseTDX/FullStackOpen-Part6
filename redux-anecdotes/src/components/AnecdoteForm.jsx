import { useDispatch, useSelector } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer.js'
import { addAnecdoteThunk, fetchAnecdotesDBThunk } from '../reducers/anecdoteReducer.thunks.js'
import { showNotification } from '../reducers/notificationReducer.js'

import './AddAnecdoteForm.css'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0)

  const newAnecdote = (event) => {
    event.preventDefault()
    if (!event.target.new.value.trim()) return;
    const content = event.target.new.value
    event.target.new.value = ''
    const newId = getId()
    dispatch(addAnecdote({content, id: newId}))
    dispatch(addAnecdoteThunk({content, id: newId}))
    dispatch(showNotification({message: `Added anecdote: ${content}`}))
  }

  return (
    <div>
      <form onSubmit={newAnecdote}>
        <div><input name='new' className='styled-input' /></div>
        <button type='submit' className="styled-submit-button">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm


// In someway i need to manage the random state of a new object so these are the sam ein the db and the local recuer.
// I think the best way is to upload it to the db and then fetch the data. I tried to find it in the local storage
// but then i need to look for the content and there can be two ancedoes with the same content
// also first adding it and then fetching it there is a async delay so there needs to be dealth with.
// or someway the id can be provided to the two action to be the same but how, some funciton call or another reducer
// that can control that and that i request a new random id.