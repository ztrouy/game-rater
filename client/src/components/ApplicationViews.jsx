import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Authorized from "./Authorized"
import Games from "../pages/games/Games"
import GameDetails from "../pages/games/GameDetails"
import NewGame from "../pages/games/NewGame"
import EditGame from "../pages/games/EditGame"
import NewReview from "../pages/reviews/NewReview"
import useAuthorizationProvider from "../shared/hooks/authorization/useAuthorizationProvider"
import { useEffect } from "react"
import { authenticateUser } from "../managers/userManager"
import { Spinner } from "reactstrap"

const ApplicationViews = () => {
    const { loggedInUser, setLoggedInUser } = useAuthorizationProvider()
    
    useEffect(() => {
        if (localStorage.getItem("rater_token")) {
            authenticateUser().then(user => {
                if (user === null) {
                    localStorage.removeItem("rater_token")
                }

                setLoggedInUser(user)
            })
        } else {
            setLoggedInUser(null)
        }
    }, [])

    if (loggedInUser === undefined) return (<Spinner/>)

    return (
        <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route element={<Authorized/>}>
                <Route path="/" element={<>Home View</>}/>
                <Route path="/games">
                    <Route index element={<Games/>}/>
                    <Route path="new" element={<NewGame/>}/>
                    <Route path=":gameId">
                        <Route index element={<GameDetails/>}/>
                        <Route path="edit" element={<EditGame/>}/>
                        <Route path="review" element={<NewReview/>}/>
                        <Route path="screenshot" element={<>New Screenshot Form View</>}/>
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<p>Whoops, nothing here...</p>}/>
        </Routes>
    )
}

export default ApplicationViews