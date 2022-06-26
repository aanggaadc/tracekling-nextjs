import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from 'react-toastify'
import {useEffect, useState } from 'react'
import {UserContext} from '../store/userContext'

function MyApp({ Component, pageProps }) {
  const [isUser, setIsUser] = useState(null)

  useEffect(() => {
    if(localStorage.getItem('authKey')){
			setIsUser(JSON.parse(localStorage.getItem('authKey')))
		}
  }, [])

  return (
    <>
      <UserContext.Provider value={{isUser, setIsUser}}>
          <Component {...pageProps} />
      </UserContext.Provider>
      <ToastContainer />
    </>
  )
}

export default MyApp
