import { useContext } from "react"
import AuthorizationContext from "./authorizationContext"

const useAuthorizationProvider = () => {
    return useContext(AuthorizationContext)
}

export default useAuthorizationProvider