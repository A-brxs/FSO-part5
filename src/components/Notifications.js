import React from 'react'

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error" id='errorNotif'>
      {message}
    </div>
  )
}

const PositiveNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="positive-notification" id='positiveNotif'>
      {message}
    </div>
  )
}

export { ErrorNotification, PositiveNotification }
