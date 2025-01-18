import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew, updateRecord } from '../services/anecdote'
import { useNotificationDispatch, setNotificationData } from '../context/notificationReducer'

import PropTypes from 'prop-types';

const AnecdoteItem = ({ anecdote, anecdoteNotificationTimeout = 15 }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: ({ id, newObject }) => updateRecord(id, newObject),
    onSuccess: (updatedAnecdote) => {
      notificationDispatch(setNotificationData(`Anecdote: '${updatedAnecdote.content}' got a new vote!`, anecdoteNotificationTimeout))
      queryClient.setQueryData(['anecdotes'], (oldAnecdote) => {
        return oldAnecdote.map(anecdote => 
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      })
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    },
    onError: (error) => {
      console.error('Error updating anecdote:', error)
    }
  })

  const onVote = (event) => {
    updateAnecdoteMutation.mutate({id: event.id, newObject: {...event, votes: event.votes + 1}})
  }

  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => onVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

AnecdoteItem.propTypes = {
  anecdote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  anecdoteNotificationTimeout: PropTypes.number,
};

export default AnecdoteItem
