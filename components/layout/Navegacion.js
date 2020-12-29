import React,{ useContext } from 'react'
import { useRouter } from 'next/router'
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'
import { Navbar, Nav, Button, NavDropdown,  Row, Col } from 'react-bootstrap'
import AuthContext from '../../context/auth/AuthContext'

const Navegacion = () => {

    const router = useRouter()  
    const { usuario, cerrarSesion } = useContext(AuthContext)

    return (

        <Navbar collapseOnSelect expand="lg" bg="white" text="light">
            <Navbar.Brand>
                <img
                    src="/static/logo.png"
                    width="40"
                    
                    className="d-inline-block align-top mr-1"
                    alt=""
                />
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link href="/" passHref>
                    <Nav.Link className="text-primary">CEM S.A.</Nav.Link>
                </Link>
                {/* <NavDropdown title="Administrar" id="administrar-nav-dropdown">
                    <Link href="/administrar/usuarios" passHref>
                        <NavDropdown.Item>Usuarios</NavDropdown.Item>
                    </Link>
                </NavDropdown> */}
            </Nav> 
            {usuario &&
            <Nav>
                <Row>
                    <Col className="d-flex flex-column align-items-center">
                        <Row>
                        <FaUserCircle 
                            size={"1.5rem"} 
                            color={"blue"}
                        />
                        </Row>
                        <Row className="d-flex justify-content-center mb-2">
                            {usuario ? usuario.nombre : "Nombre Usuario"}                         
                        </Row>
                        <Row>
                            <Button 
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                    cerrarSesion()
                                    router.push("/")
                                }}
                            >Cerrar Sesión
                            </Button>  
                        </Row>
                    </Col>
                </Row>
            </Nav>
            }
        </Navbar.Collapse>
        </Navbar>
     );
}
 
export default Navegacion;