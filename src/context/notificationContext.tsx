import { createContext, ReactNode, useContext, useState, useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import NotificationReducer from './notificationReducer'
import { CLEAR_ALERT, SET_ALERT, SET_NOTICE, CLEAR_NOTICE } from './types'

type NotificationProviderProps = {
  children: ReactNode
}

type NotificationContext = {
  setAlert: (msg: string, type: any, timeout: number) => void
  setNotice: (msg: string, type: any, timeout: number) => void
}

const NotificationContext = createContext({} as NotificationContext)

export const useNotification = () => {
  return useContext(NotificationContext)
}

export const NotificationProviderProps = ({}: NotificationProviderProps) => {
  const initialState = {
    alert: '',
    notice: ''
  }
  const [_, dispatch] = useReducer(NotificationReducer, initialState);

  const setAlert = (msg: any, type: any, timeout = 5000) => {
    const id = uuid()
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });
    setTimeout(() => dispatch({ type: CLEAR_ALERT, payload: id }), timeout)
  }

  const setNotice = (msg: string, type: any, timeout=5000) => {
    const id = uuid()
    dispatch({
      type: SET_NOTICE,
      payload: { msg, type, id }
    });
    setTimeout(() => dispatch({ type: CLEAR_NOTICE, payload: id }), timeout)
  }

  return (
    <NotificationContext.Provider value={{
      setAlert,
      setNotice
    }}>

    </NotificationContext.Provider>
  )
}