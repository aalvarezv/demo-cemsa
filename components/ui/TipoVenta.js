import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap'

const TipoVenta = ({handleGetTipoVentaSelect}) => {

    const [tiposVenta, setTiposVenta] = useState([{
      codigo: 1,
      descripcion: 'Venta Normal',
      select: false,
    },{
      codigo: 2,
      descripcion: 'Venta de Tienda',
      select: false,
    }])

    const handleSelectTipoVenta = codigo => {

      const newTiposVenta = tiposVenta.map(tipoVenta => tipoVenta.codigo === codigo 
          ?
            {
              ...tipoVenta,
              select: true
            }
          :
          {
            ...tipoVenta,
            select: false
          }
      )

      setTiposVenta(newTiposVenta)
      
      handleGetTipoVentaSelect(newTiposVenta.filter(tipoVenta => tipoVenta.codigo === codigo)[0])

    }

    return (
      <>
        <Row>
            <Col>
              <small className="text-primary">Tipo de venta</small>
            </Col>
        </Row>
        <Row className="mb-2" >
        {tiposVenta.map(tipoVenta => (
         
            <Col key={tipoVenta.codigo}>
              <Button
                size="sm"
                variant={!tipoVenta.select ? "outline-secondary" : "secondary"}
                block
                onClick={() => handleSelectTipoVenta(tipoVenta.codigo)}
              >
                {tipoVenta.descripcion}
              </Button>
            </Col>
          
        ))}
        
        </Row>
      </>
      );
}
 
export default TipoVenta;