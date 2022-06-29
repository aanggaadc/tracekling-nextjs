import { useContext } from 'react'
import {UserContext} from '../../store/userContext'
import Index from '../../pages/index'

function AuthRoutes({children}) {
    const {isUser} = useContext(UserContext)

	return !isUser ? children : <Index />
}

export default AuthRoutes;