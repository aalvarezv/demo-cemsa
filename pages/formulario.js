import React, { useContext } from 'react'
import { Form, Button, Container, Row, Col} from 'react-bootstrap'
import { toast } from 'react-toastify'
import AuthContext from '../context/auth/AuthContext'
import Layout from '../components/layout/Layout'
import SolicitudRepuestos from '../components/forms/SolicitudRepuestos'

const Formulario = () => {

    const { usuario } = useContext(AuthContext)

    return (
        <Layout>
        <Container className="mt-2" fluid>

              <Row className="justify-content-sm-center">
                  <Col xl="3" lg="4" md="5" sm="10">
                      <h4 className="mb-4 text-center">Solicitud de Repuestos</h4>
                      <Row>
                        <Col>
                          <small>Empresa: {usuario ? usuario.nombre : null} </small> 
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                        
                          <small>RUT: {usuario ? `${usuario.user.substring(0, usuario.user.length - 1)}-${usuario.user[usuario.user.length - 1]}` : null} </small> 
                        </Col>
                      </Row>
                      <SolicitudRepuestos />
                  </Col>
                </Row>
        </Container>
        </Layout>
      );
}
 
export default Formulario;
