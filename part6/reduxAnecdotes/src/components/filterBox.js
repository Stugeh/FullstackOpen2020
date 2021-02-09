import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        const text = event.target.value.toLowerCase()
        props.updateFilter(text)
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



const mapDispatchToProps = {updateFilter}


export default connect(null, mapDispatchToProps)(Filter)