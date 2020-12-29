import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const TipoGarantia = ({handleGetTipoGarantiaSelect}) => {

    const [tiposGarantia, setTiposGarantia] = useState([{
        codigo: 1,
        descripcion: 'Garantía Solar (Cta. Nº 21112140)',
        select: false,
    },{
        codigo: 2,
        descripcion: 'Garantía Exportación (Cta. Nº 21112143)',
        select: false,
    },{
        codigo: 3,
        descripcion: 'Garantía Calefones (Cta Nº 21112141)',
        select: false,
    },{
        codigo: 4,
        descripcion: 'Garantía Termos (Cta Nº 21112144)',
        select: false,
    },{
        codigo: 5,
        descripcion: 'Garantía Lavaplatos (Cta Nº 21112142)',
        select: false,
    },{
        codigo: 6,
        descripcion: 'Sin cargo a Garantía',
        select: false,
    }])

    const handleSelectTipoGarantia = codigo => {
        
        const newTiposGarantia = tiposGarantia.map(tipoGarantia => tipoGarantia.codigo === codigo 
            ?
                {
                ...tipoGarantia,
                select: true
                }
            :
                {
                ...tipoGarantia,
                select: false
                }
        )

        setTiposGarantia(newTiposGarantia)

        handleGetTipoGarantiaSelect(newTiposGarantia.filter(tipoGarantia => tipoGarantia.codigo === codigo)[0])
    }

    return ( 
        <>
            <Row>
                <Col>
                    <small className="text-primary">Seleccione tipo de garantía</small>
                </Col>
            </Row>
            {tiposGarantia.map(tipoGarantia => (
                <Row className="mb-2" key={tipoGarantia.codigo}>
                <Col>
                <Button
                    size="sm"
                    variant={!tipoGarantia.select ? "outline-secondary" : "secondary"}
                    block
                    onClick={() => handleSelectTipoGarantia(tipoGarantia.codigo)}
                >
                    {tipoGarantia.descripcion}
                </Button>
                </Col>
            </Row>
            ))
            }
        </>
     );
}
 
export default TipoGarantia;