import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from 'react-toastify'
import {useEffect, useState } from 'react'
import {UserContext} from '../store/userContext'
import Axios from 'axios'
import {useRouter} from 'next/router'

function MyApp({ Component, pageProps }) {
  const [isUser, setIsUser] = useState(null)
  const router = useRouter()

  Axios.interceptors.request.use(
    function (config) {
      if (isUser) {
        config.headers.Authorization = "Bearer " + isUser.token;
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
