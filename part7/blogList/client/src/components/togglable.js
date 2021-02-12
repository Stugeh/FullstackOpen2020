import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

//
// Enables the user to toggle the vicibility of its children
//

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  // sets css property 'display' of children to none
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  useImperativeHandle(ref, () => { return { toggleExpanded } })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className="infoEnable">{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableComponent">
        {props.children}
        <button onClick={toggleVisibility} className="infoDisable">hide</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable