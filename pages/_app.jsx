import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from 'react-toastify'
import {useEffect, useState } from 'react'
import {UserContext} from '../utils/userContext'
import {useRouter} from 'next/router'

function MyApp({ Component, pageProps }) {
  const [authData, setAuthData] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem("authKey")){
			setAuthData(JSON.parse(localStorage.getItem('authKey')))
		}
  }, [])

  return (
    <>
      <UserContext.Provider value={authData}>
          <Component key={router.asPath} {...pageProps} />
      </UserContext.Provider>
      <ToastContainer />
    </>
  )
}

export default MyApp
