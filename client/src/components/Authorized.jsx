import { Navigate, Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import useAuthorizationProvider from "../shared/hooks/authorization/useAuthorizationProvider"

const Authorized = () => {
    const { loggedInUser } = useAuthorizationProvider()
    
    if (loggedInUser) {
        return (
            <>
                <NavBar/>
                <Outlet/>
            </>
        )
    }

    return <Navigate to="/login" replace/>
}

export default Authorized