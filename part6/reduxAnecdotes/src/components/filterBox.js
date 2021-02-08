import React from 'react'
import { useDispatch} from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        const text = event.target.value.toLowerCase()
        dispatch(updateFilter(text))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
  )
}

export default Filter