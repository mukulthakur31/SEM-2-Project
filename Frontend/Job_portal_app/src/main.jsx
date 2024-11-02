import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


export const context = createContext()

export const AppWrapper=()=>{
  const [authenticated,setisauthenticated]= useState(false)
  const [user,setuser]= useState({})
  
  return(
    <context.Provider value={{authenticated,setisauthenticated,user,setuser}}>
      <App/>
    </context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper/>
  </StrictMode>,
)
