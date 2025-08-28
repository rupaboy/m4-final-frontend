import { createContext, useCallback, useState } from 'react'
import NotificationTag from '../component/NotificationTag'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const notify = useCallback(
    ({
      id = null, // clave opcional para identificar notificación única
      notificationTag,
      ratio = '',
      duration = 2000,
      withProgress = true,
    }) => {
      if (id) {
        // Reemplazar notificación con ese id si existe
        setNotifications((prev) => {
          const exists = prev.find((n) => n.id === id)
          if (exists) {
            return prev.map((n) => (n.id === id ? { id, notificationTag, ratio, duration, withProgress } : n))
          } else {
            return [...prev, { id, notificationTag, ratio, duration, withProgress }]
          }
        })

        // Eliminar automáticamente tras duración
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== id))
        }, duration)
      } else {
        // Sin id, agregar normalmente con id generado
        const newId = Date.now() + Math.random()
        setNotifications((prev) => [...prev, { id: newId, notificationTag, ratio, duration, withProgress }])

        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== newId))
        }, duration)
      }
    },
    []
  )

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notifications.map(({ id, notificationTag, ratio, duration, withProgress }, index) => (
        <NotificationTag
          key={id}
          notificationTag={notificationTag}
          ratio={ratio}
          duration={duration}
          withProgress={withProgress}
          index={index}
        />
      ))}
    </NotificationContext.Provider>
  )
}
