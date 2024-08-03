import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap"
import { NavLink as RRNavLink, useNavigate } from "react-router-dom"

const NavBar = () => {
    const navigate = useNavigate()
    
    return (
        <div>
            <Navbar color="light" light fixed="true" expand="lg">
                <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
                    Game Rater
                </NavbarBrand>
                <Nav navbar>
                    <NavItem>
                        <NavLink tag={RRNavLink} to="/games">
                            Games
                        </NavLink>
                    </NavItem>
                </Nav>
                <Button 
                    color="primary"
                    onClick={() => {
                        localStorage.removeItem("rater_token")
                        navigate("/login")
                    }}
                >
                    Logout
                </Button>
            </Navbar>
        </div>
    )
}

export default NavBar