import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  const currentFilter = useSelector(state => state.filter.payload)

  return (
    <div>
      Filter <input name='filter' onChange={handleChange} value={currentFilter} />
    </div>
  )
}

export default Filter
