import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../managers/userManager"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const existDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()
        login({username: email, password: password}).then(authInfo => {
            if (authInfo.valid) {
                localStorage.setItem("rater_token", JSON.stringify(authInfo))
                navigate("/")
            } else {
                existDialog.current.showModal()
            }
        })
    }

    return (
        <div className="m-3">
            <dialog ref={existDialog}>
                <div>User does not exist</div>
                <Button onClick={() => existDialog.current.close()}>Close</Button>
            </dialog>
            <h3>Login</h3>
            <Form onSubmit={handleLogin} className="mt-4">
                <FormGroup>
                    <Label>Email Address</Label>
                    <Input
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        placeholder="example@email.com"
                        type="email"
                        required
                        autoFocus
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Button type="submit">Sign In</Button>
                </FormGroup>
            </Form>
            <div>
                <Button color="link" onClick={() => navigate("/register")}>Register</Button>
            </div>
        </div>
    )
}

export default Login