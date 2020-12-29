
import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify';

const OA = ({handleGetNumeroOA}) => {

    const [oa, setOA] = useState('')
    

    const handleClickAgregarOA = () => {

        handleGetNumeroOA(oa);
       
    }

    return (  
        <Row className="mb-3">
            <Col xs="6">
                <Form.Control 
                    type="number"  
                    name="oa"
                    maxLength="6"
                    placeholder="Nº de OA"
                    onChange={e => {
                        setOA(e.target.value)
                    }}
                    value={oa}
                    autoComplete="off"
                />
            </Col>
            <Col xs="6">
                <Button
                    variant="primary"
                    block
                    onClick={handleClickAgregarOA}
                >
                    + Modelos
                </Button>
            </Col>
        </Row>

    );
}
 
export default OA;