import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
//
// displays the errors and notifications to the user
//

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification.text !== null) {
    return (
      <Alert variant={notification.variant}>
        {notification.text}
      </Alert>
    )
  } else { return (null) }
}

export default Notification