import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteItem from './components/AnecdoteItem'
import Notification from './components/Notification'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getAll, createNew } from './services/anecdote'
import { NotificationContextProvider } from './context/notificationReducer'

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAll(),
    retry: 2,
    refetchOnWindowFocus: false,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>ERROR, server did not respond</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContextProvider>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <AnecdoteItem key={anecdote.id} anecdote={anecdote}/>
      )}
    </NotificationContextProvider>
  )
}

export default App
