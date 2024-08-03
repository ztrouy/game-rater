import { Navigate, Outlet } from "react-router-dom"
import NavBar from "./NavBar"

const Authorized = () => {
    if (localStorage.getItem("rater_token")) {
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