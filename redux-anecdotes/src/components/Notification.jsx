import { useSelector, useDispatch } from "react-redux"
import { disableNotification } from '../reducers/notificationReducer'

import './Notification.css'

let timeoutId

const Notification = () => {
  const notificationData = useSelector(state => state.notification)
  const dispatch = useDispatch()

  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  if (notificationData.timeout > 0) {
    timeoutId = setTimeout(() => {
      dispatch(disableNotification());
    }, notificationData.timeout*1000);
  }

  return (
    <div className={`notification ${notificationData.timeout === 0 ? 'fade-out' : 'fade-in'} `}>
      {notificationData.message}
    </div>
  )
}

export default Notification
