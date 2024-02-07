import { createContext, useState } from 'react'

export const NotificationsContext = createContext()

export function NotificationsProvider ({ children }) {
  const [notification, setNotification] = useState(null)

  return (
    <NotificationsContext.Provider value={{ notification, setNotification }}>
      { children }
    </NotificationsContext.Provider>
  )
}
