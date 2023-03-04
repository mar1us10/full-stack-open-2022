import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes((filter).toLowerCase()))
  
  const dispatch = useDispatch()
  
  const handleVote = async (id) => {
    const votedAnecdote = await dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 5));
  }

  return (
    <div>
      {filteredAnecdotes.sort((a, b) => (b.votes - a.votes)).map(anecdote => 
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={handleVote} />
      )}
    </div>
  )
}

export default AnecdoteList