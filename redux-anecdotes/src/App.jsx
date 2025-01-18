import AnecdoteForm from './components/AnecdoteForm.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'
import Filter from './components/Filter.jsx'
import Notification from './components/Notification.jsx'

import './App.css'

const App = () => {
  return (
    <div>
      <Notification />
      <div className="container">
        <h2>Anecdotes</h2>
        <Filter />
        <AnecdoteList />
        <h2>create new</h2>
        <AnecdoteForm />
      </div>
    </div>
  )
}

export default App
