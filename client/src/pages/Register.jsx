import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../managers/userManager"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const existDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (event) => {
        event.preventDefault()
        
        const registration = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        }
        
        register(registration).then(authInfo => {
            if (authInfo && authInfo.token) {
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
            <h3>Register</h3>
            <Form onSubmit={handleRegister} className="mt-3">
                <FormGroup>
                    <Label>First Name</Label>
                    <Input
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                        type="text"
                        placeholder="John"
                        required
                        autoFocus
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                        type="text"
                        placeholder="Doe"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        type="email"
                        placeholder="example@email.com"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        type="password"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Button type="submit">Register</Button>
                </FormGroup>
            </Form>
            <div>
                <Button color="link" onClick={() => navigate("/login")}>Already have an account?</Button>
            </div>
        </div>
    )
}

export default Register