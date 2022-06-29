import { useContext } from 'react'
import {UserContext} from '../../store/userContext'
import Login from '../../pages/login'

function PrivateRoutes({children}) {

    const {isUser} = useContext(UserContext)

	return isUser ? children : <Login />
}

export default PrivateRoutes;