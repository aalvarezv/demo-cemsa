import React from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'

const ListOAModelos = ({modelosOAS}) => {

    return (  
        <Row>
            <Col>
                <ListGroup as="ul">
                {modelosOAS.map( (moa,index) => {
                    if(moa.modelos.length > 0){

                        const { numeroOA } = moa
                       
                        return (
                        <ListGroup.Item 
                            key={index}
                            as="li" 
                            variant={"primary"}
                        >
                            <Row>
                                <Col className="d-flex justify-content-between">
                                    <h5>{`Nº OA ${numeroOA}`}</h5>
                                    <small>{moa.modelos.length} Modelos</small>
                                </Col>
                            </Row>
                            <ListGroup as ="ul">
                            {moa.modelos.map( (m,index) => {
                                const { codigo, descripcion, modelo } = m
                                return (
                                <ListGroup.Item 
                                    key={index}
                                    as="li" 
                                    variant={"light"}
                                >
                                    <Row>
                                        <Col><h5>{descripcion}</h5></Col>
                                    </Row>
                                    <Row>
                                        <Col><h6>{modelo}</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col><small>{codigo}</small></Col>
                                    </Row>
                                </ListGroup.Item>
                                )
                            })}
                            </ListGroup>
                        </ListGroup.Item>
                        )
                    }
                })}
                </ListGroup>
            </Col>
        </Row>
    );
}
 
export default ListOAModelos;