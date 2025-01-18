export const verifyAnecdoteStructure = (param) => {
  if (!Array.isArray(param)) {
    return false;
  }

  for (let item of param) {
    if (typeof item.content !== 'string' || 
        typeof item.id !== 'number' || 
        typeof item.votes !== 'number') {
      return false;
    }
  }
  return true;
}

export const getId = () => (100000 * Math.random()).toFixed(0)

export const anecdoteAsObject = (anecdote, anecdoteId = -1) => {
  return {
    content: anecdote,
    id: anecdoteId === -1 ? getId() : anecdoteId,
    votes: 0
  }
}
