import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove admin from storage
    localStorage.removeItem('user')

    //  logout action
    dispatch({ type: 'LOGOUT' })
    
  }

  return { logout }
}