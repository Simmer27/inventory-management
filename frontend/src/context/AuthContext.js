import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

// Reducer function to handle authentication state updates
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload } 
    case 'LOGOUT':
      return { user: null } 
    default:
      return state 
  }
}

// AuthContextProvider component to wrap the application and provide authentication state
export const AuthContextProvider = ({ children }) => {
  // useReducer hook to manage authentication state with authReducer function
  const [state, dispatch] = useReducer(authReducer, { 
    user: null 
  })

  // useEffect hook to check if user data exists in localStorage on initial render
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) 

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, []) 

  console.log('AuthContext state:', state) 
  
  return (
    // Provide authentication state and dispatch function to the entire app
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}
