import React from 'react'
import {useSelector} from 'react-redux'

//
// displays the errors and notifications to the user
//

const Notification = () => {
  const notification = useSelector(state=>state.notification)
  if (notification.text !== null) {
    return (
      <div className={notification.className}>
        {notification.text}
      </div>
    )
  } else { return (null) }
}

export default Notification