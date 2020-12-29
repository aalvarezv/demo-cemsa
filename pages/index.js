import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Form, Button, Container, Row, Col} from 'react-bootstrap'
import { toast } from 'react-toastify'
import AuthContext from '../context/auth/AuthContext'
import Layout from '../components/layout/Layout'

/*
 * Las variables de entorno pueden ser de 2 tipos:
 * NEXT_PUBLIC_API_URL => Estará disponible en todos lados mediante process.env.NEXT_PUBLIC_API_URL
 * API_URL => Estará disponible sólo mediante getStaticProps (Solo está disponible para pages)
 * Nota: .env.local => Anula .env, .env.production, Queda por defecto
 * El comando npm run dev permite usar las variables de entorno de .env y .env.local
 * El comando npm run build && npm start usará las variables de entorno de .env.production o .env.local si es que está definido.
 */

export default function Home(props) {

  //console.log('FROM props.API_URL:',props.API_URL)

  const { usuarioAuth } = useContext(AuthContext)
  const router = useRouter()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const [users, setUsers] = useState([{
    user: '162323695',
    nombre: 'Usuario 1',
    password: '1234',
  },{
    user: '18380233K',
    nombre: 'Usuario 2',
    password: '1234',
  },{
    user: '92215180',
    nombre: 'Edgardo Ainol Contreras',
    password: '1234',
  }])


  const handleSingIn = () => {

    if(user.trim() === ''){
      toast.error('Ingrese usuario', {containerId: 'sys_msg'})
      return
    }

    if(password.trim() === ''){
      toast.error('Ingrese clave', {containerId: 'sys_msg'})
      return
    }

    const validUser = users.find(usr => usr.user === user && usr.password === password)
    if(!validUser){
      toast.error('Usuario y clave ingresados no es válido', {containerId: 'sys_msg'})
      return
    }

    usuarioAuth(validUser)

    router.push('/formulario')

  }


  return (
    <Layout>
        <Container className="mt-2" fluid>
              <Row className="justify-content-sm-center">
                  <Col xl="3" lg="4" md="5" sm="10">
                      <h4 className="mb-4 text-center">Iniciar Sesión </h4>
                      <Form> 
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>RUT</Form.Label>
                              <Form.Control 
                                  type="text"
                                  name="rut"
                                  placeholder="Ingresa tu RUT"
                                  onChange={e => {
                                    setUser(e.target.value)
                                  }}
                                  value={user}
                                  autoComplete="off"
                              />
                          </Form.Group>
                          <Form.Group controlId="formBasicPassword">
                              <Form.Label>Clave</Form.Label>
                              <Form.Control 
                                  type="password"  
                                  name="clave"
                                  placeholder="Ingresa tu Clave"
                                  onChange={e => {
                                      setPassword(e.target.value)
                                  }}
                                  value={password}
                                  autoComplete="off"
                              />
                          </Form.Group>
                          
                      </Form>
                      <Button 
                          variant="primary" 
                          type="submit"
                          block
                          onClick ={handleSingIn}
                      >
                          Ingresar
                      </Button>
                  </Col>
              </Row>
          </Container>
    </Layout>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
        API_URL: process.env.API_URL || null,
    },
  }
}