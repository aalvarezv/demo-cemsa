import React, { useState } from 'react'
import { ListGroup, Row, Col} from 'react-bootstrap'

const ListModelo = ({modelos, handleGetModelo}) => {

    return ( 
        <Row>
            <Col>
                <ListGroup as="ul">
                {modelos.map( (m,index) => {
                    const { codigo, descripcion, modelo, select } = m
                    return (
                    <ListGroup.Item 
                        key={index}
                        as="li" 
                        variant={select ? "primary" : "light"}
                        onClick={() => handleGetModelo(m)}
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
            </Col>
        </Row>
        
     );
}
 
export default ListModelo;