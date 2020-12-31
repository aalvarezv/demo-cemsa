import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import ListModelo from '../lists/ListModelo'
import {modelos as dataModelos} from '../../data/modelos'

const BusquedaModelo = ({show, handleHideModalModelos, handleGetModelo, numeroOA, oaModelos}) => {
   
    const [codigo, setCodigo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [modelo, setModelo] = useState('')
    const [modelos, setModelos] = useState(dataModelos)
    const [contBusqueda, setContBusqueda] = useState(0)

    const [modelosFilter, setModelosFilter] = useState([])

    useEffect(() => {
    
        if(oaModelos.length > 0){
            const newModelosFilter = modelosFilter.map(modeloFilter => {
                if(oaModelos[0].modelos.find(m => m.codigo === modeloFilter.codigo)){
                    return {
                        ...modeloFilter,
                        select: true,
                    }
                }else{
                    return {
                        ...modeloFilter,
                        select: false,
                    }
                }
            })
            setModelosFilter(newModelosFilter)
        }else{
            const newModelosFilter = modelosFilter.map(modeloFilter => {
                return {
                    ...modeloFilter,
                    select: false,
                }
            })
            setModelosFilter(newModelosFilter)
        }

    }, [oaModelos, contBusqueda])

    const handleBuscarModelos = () => {

        let newModelosFilter = modelos.filter(
            m => m.codigo.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().indexOf(codigo.toLocaleLowerCase()) > -1 
        && m.descripcion.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().indexOf(descripcion.toLocaleLowerCase()) > -1 
        && m.modelo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().indexOf(modelo.toLocaleLowerCase()) > -1
        )

        setModelosFilter(newModelosFilter)
        setContBusqueda(contBusqueda + 1)
    }

    const handleHideModal = () => {
        setCodigo('')
        setDescripcion('')
        setModelo('')
        setModelosFilter([])
        handleHideModalModelos()
    }

    return ( 
        
        <Modal
            show={show}
            onHide={() => {
                handleHideModal()
            }}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                <Row>
                    <Col>
                        Búsqueda de Modelos
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                        <h6>Nº OA {numeroOA}</h6>
                    </Col>
                </Row>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mb-2">
                    <Col>
                        <Form.Control 
                            type="text"  
                            name="descripcion"
                            placeholder="Descripción"
                            onChange={e => {
                                setDescripcion(e.target.value)
                            }}
                            value={descripcion}
                            autoComplete="off"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <Form.Control 
                            type="text"  
                            name="modelo"
                            placeholder="Modelo"
                            onChange={e => {
                                setModelo(e.target.value)
                            }}
                            value={modelo}
                            autoComplete="off"
                        />
                    </Col>
                    <Col>
                        <Form.Control 
                            type="text"  
                            name="codigo"
                            placeholder="Código"
                            onChange={e => {
                                setCodigo(e.target.value)
                            }}
                            value={codigo}
                            autoComplete="off"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <Button
                            variant="primary"
                            block
                            onClick={handleBuscarModelos}
                        >
                            Buscar
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="info"
                            block
                            onClick={handleHideModal}
                        >
                            Aceptar
                        </Button>
                    </Col>
                </Row>
                <ListModelo
                    modelos={modelosFilter}
                    handleGetModelo={handleGetModelo}
                />

            </Modal.Body>
        </Modal>
     );
}
 
export default BusquedaModelo;