import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from 'react-toastify'
import {useEffect, useState } from 'react'
import {UserContext} from '../utils/userContext'

function MyApp({ Component, pageProps }) {
  const [authData, setAuthData] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("authKey")){
			setAuthData(JSON.parse(localStorage.getItem('authKey')))
		}
  }, [])

  return (
    <>
      <UserContext.Provider value={authData}>
          <Component {...pageProps} />
      </UserContext.Provider>
      <ToastContainer />
    </>
  )
}

export default MyApp
