import { useNotificationValue, useNotificationDispatch } from "../context/notificationReducer"
import './Notification.css'

const Notification = () => {
  const notificationData = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()

  if (notificationData.timeout > 0) {
    setTimeout(() => {
      notificationDispatch({ type: "RESET" })
    }, notificationData.timeout * 1000)
  }

  return (
    <div className={`notification ${notificationData.timeout === null ? 'fade-out' : 'fade-in'} `}>
      {notificationData.message}
    </div>
  )
}

export default Notification
