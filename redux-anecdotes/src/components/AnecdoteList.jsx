import { useDispatch, useSelector } from 'react-redux'
import { toggleVoteOf } from '../reducers/anecdoteReducer.js'
import { fetchAnecdotesDBThunk, updateAnecdoteVotesThunk } from '../reducers/anecdoteReducer.thunks.js'
import { showNotification } from '../reducers/notificationReducer.js'
import { useEffect } from 'react'

import './AnecdoteList.css'

const AnecdoteList = () => {
  console.log(useSelector(state => state.anecdote))
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchAnecdotesDBThunk())
  }, [dispatch])

  const anecdotes = useSelector(state => state.anecdote)
  const anecdoteFilterData = useSelector(state => state.filter)
  const filterdItems = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(anecdoteFilterData))
  filterdItems.sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(toggleVoteOf(id))
    const currentAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(updateAnecdoteVotesThunk(id))
    dispatch(showNotification({message: `Voted for: ${currentAnecdote.content}`}))
  }

  
  return (
    <div>
      {filterdItems.map(anecdote => (
        <div key={anecdote.id} className="anecdote-box">
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes === 1 ? `${anecdote.votes} vote` : `${anecdote.votes} votes`}
            <br/>
            <button onClick={() => vote(anecdote.id)} className='styled-vote-button'>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
