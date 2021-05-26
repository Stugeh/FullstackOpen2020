/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    setTimeout(() => {
      setNotification({ ...notification, msg: '' });
    }, notification.timer);
  }, [notification.msg]);

  return (
    <div
      className="alert alert-primary"
      role="alert"
      style={{
        position: 'fixed',
        bottom: '10px',
        width: '800px',
        zIndex: '2',
        textAlign: 'center',
        visibility: notification.msg.length > 0 ? 'visible' : 'hidden',
      }}
    >
      <h4>{notification.msg}</h4>
    </div>
  );
};
export default Notification;
