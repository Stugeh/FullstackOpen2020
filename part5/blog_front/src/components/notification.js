import React from 'react'

const Notification = ({ message, errorMsg }) => {
    if (message !== null) {
        return (
            <div className="message">
                {message}
            </div>
        )
    }
    if (errorMsg !== null) {
        return (
            <div className="error">
                {errorMsg}
            </div>
        )
    } else { return (null) }
}

export default Notification