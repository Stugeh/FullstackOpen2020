import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

//
// Enables the user to toggle the vicibility of its children
//

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    // sets css property 'display' of children to none 
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable