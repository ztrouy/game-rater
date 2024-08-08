import { createContext } from "react"

const AuthorizationContext = createContext({
    loggedInUser: {},
    setLoggedInUser: () => {}
})

export default AuthorizationContext