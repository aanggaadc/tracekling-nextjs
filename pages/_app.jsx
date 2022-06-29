import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from 'react-toastify'
import {useEffect, useState } from 'react'
import {UserContext} from '../store/userContext'
import Axios from 'axios'
import {useRouter} from 'next/router'
import {CookiesProvider, useCookies} from 'react-cookie'

function MyApp({ Component, pageProps }) {
  const [isUser, setIsUser] = useState(null)
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['authKey'])
  const authData = cookies.authKey

  Axios.interceptors.request.use(
    function (config) {
      if(authData){
        config.headers.Authorization = "Bearer " + authData.token;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  Axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        if (error.response.status == 401) {
          router.push("/login");
          localStorage.removeItem("authKey");
          toast.error(error.response.data.message);
        }
      }
      return Promise.reject(error);
    }
  );


  useEffect(() => {
    if(cookies.authKey){
			setIsUser(cookies.authKey)
		}

    setTimeout(() => {
        localStorage.removeItem("adminKey");
    }, 1000)

  }, [])

  return (
    <>
      <CookiesProvider>
          <UserContext.Provider value={{isUser, setIsUser, cookies, setCookie, removeCookie}}>
              <Component {...pageProps} />
          </UserContext.Provider>
      </CookiesProvider>
      <ToastContainer />
    </>
  )
}

export default MyApp
