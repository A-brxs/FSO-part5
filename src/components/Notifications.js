import React from 'react'

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const PositiveNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="positive-notification">
      {message}
    </div>
  )
}

export { ErrorNotification, PositiveNotification }
