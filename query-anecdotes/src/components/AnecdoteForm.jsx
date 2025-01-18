import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../services/anecdote'
import { useNotificationDispatch, setNotificationData } from '../context/notificationReducer'

const AnecdoteForm = ({ anecdoteNotificationTimeout = 15}) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      notificationDispatch(setNotificationData(`New anecdote: ${newAnecdote.content}`, anecdoteNotificationTimeout))
      queryClient.setQueryData(['anecdotes'], (oldAnecdote) => {
        return oldAnecdote.map(anecdote => 
          anecdote.id === newAnecdote.id ? newAnecdote : anecdote
        )
      })
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    },
    onError: (_error) => {
      notificationDispatch(setNotificationData(`Too short anecdote, must have a length of 5 or more`, anecdoteNotificationTimeout))
    }
  })

  
  const onCreate = (event) => {
    event.preventDefault()
    const getId = () => (100000 * Math.random()).toFixed(0)

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, id: getId(), votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
