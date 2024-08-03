import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Authorized from "./Authorized"

const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route element={<Authorized/>}>
                <Route path="/" element={<>Home View</>}/>
                <Route path="/games">
                    <Route index element={<>Games List View</>}/>
                    <Route path="new" element={<>New Game Form View</>}/>
                    <Route path=":gameId">
                        <Route index element={<>Games Details View</>}/>
                        <Route path="edit" element={<>Edit Game Form View</>}/>
                        <Route path="review" element={<>Review Game Form View</>}/>
                        <Route path="screenshot" element={<>New Screenshot Form View</>}/>
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<p>Whoops, nothing here...</p>}/>
        </Routes>
    )
}

export default ApplicationViews