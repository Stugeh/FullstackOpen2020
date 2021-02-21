import React, { useState, useImperativeHandle } from 'react'
import {Button} from 'react-bootstrap'
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
    <span>
      <span style={hideWhenVisible}>
        <Button variant='info' onClick={toggleVisibility} className="infoEnable">{props.buttonLabel}</Button>
      </span>
      <span style={showWhenVisible} className="togglableComponent">
        <Button variant='secondary' onClick={toggleVisibility} className="infoDisable">hide</Button>
        {props.children}
      </span>
    </span>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable