import React, { useState, useContext } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import TipoVenta from '../ui/TipoVenta'
import TipoGarantia from '../ui/TipoGarantia'
import OA from '../ui/OA'
import BusquedaModelo from '../modals/BusquedaModelo'
import ListOAModelos from '../lists/ListOAModelos'
import { toast } from 'react-toastify'
import AuthContext from '../../context/auth/AuthContext'
import axios from 'axios'

const SolicitudRepuestos = () => {

    const { usuario } = useContext(AuthContext)

    const [tipoGarantia, setTipoGarantia] = useState(null)
    const [tipoVenta, setTipoVenta] = useState(null)
    const [numeroOA, setNumeroOA] = useState(null)
    const [modelosOAS, setModelosOAS] = useState([])
    const [oaModelos, setOAModelos] = useState([]) 
    const [showModalModelos, setShowModalModelos] = useState(false)

    const [oas, setOAS] = useState([
        234201,
        234202,
        234203,
        234204,
        234205,
        234206,
        234207,
        234208,
        234209,
        234210,
    ])

    const handleGetTipoGarantiaSelect = tipoGarantia => {

        setTipoGarantia(tipoGarantia)

    }

    const handleGetTipoVentaSelect = tipoVenta => {

        setTipoVenta(tipoVenta)

    }

    const validaFormulario = () => {

        if(!tipoVenta){
            toast.error("Seleccione tipo de venta", {containerId: 'sys_msg'})
            return false
        }

        if(!tipoGarantia){
            toast.error("Seleccione tipo de garantía", {containerId: 'sys_msg'})
            return false
        }

        if(oaModelos.length === 0){
            toast.error("No ha ingresado repuestos para solicitar", {containerId: 'sys_msg'})
            return false
        }

        return true

    }

    const handleGetNumeroOA = numeroOA => {

        if(!tipoVenta){
            toast.error("Seleccione tipo de venta", {containerId: 'sys_msg'})
            return false
        }

        if(!tipoGarantia){
            toast.error("Seleccione tipo de garantía", {containerId: 'sys_msg'})
            return false
        }

        if(numeroOA.trim() === ''){
            toast.error("Ingrese Número OA", {containerId: 'sys_msg'})
            return false
        }

        if(!oas.find(_oa => _oa === Number(numeroOA))){
            toast.error("Nº OA ingresado no existe, verifique", {containerId: 'sys_msg'})
            return
        }

        setNumeroOA(numeroOA)
        setOAModelos(modelosOAS.filter(modelosOAS => modelosOAS.numeroOA === numeroOA))
        setShowModalModelos(true)

    }

    const handleGetModelo = modelo => {
        
       if(!modelosOAS.find(modeloOA => modeloOA.numeroOA === numeroOA)){

            const newModelosOAS = [
                ...modelosOAS,
                {
                    numeroOA,
                    modelos:[modelo]
                }
            ]
            setModelosOAS(newModelosOAS)
            setOAModelos(newModelosOAS.filter(modelosOAS => modelosOAS.numeroOA === numeroOA)) 

       }else{
           const newModelosOAS = modelosOAS.map(modeloOA => {
                if(modeloOA.numeroOA === numeroOA){
                    return {
                        numeroOA,
                        modelos: modeloOA.modelos.find( m => m.codigo === modelo.codigo ) ? modeloOA.modelos.filter(m => m.codigo !== modelo.codigo) : [...modeloOA.modelos, modelo]
                    }
                }else{
                    return modeloOA
                }
           })
           setOAModelos(newModelosOAS.filter(modelosOAS => modelosOAS.numeroOA === numeroOA)) 
           setModelosOAS(newModelosOAS)
        
       }

    }

    const handleHideModalModelos = () => {
        setShowModalModelos(false)
    }

    const handleEnviar = async () => {

        try {

            if(!validaFormulario()){
                return
            }
            
            const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cem/enviar-solicitud-repuestos`,{
                usuario,
                tipoGarantia,
                tipoVenta,
                modelosOAS
            })

            toast.success(resp.data.msg, {containerId: 'sys_msg'})
            
        } catch (error) {
            toast.error(error, {containerId: 'sys_msg'})
        }
       
    }

    return ( 
        <>
            <TipoVenta 
                handleGetTipoVentaSelect={handleGetTipoVentaSelect}
            />
            <TipoGarantia 
                handleGetTipoGarantiaSelect={handleGetTipoGarantiaSelect}
            />
            <OA
                handleGetNumeroOA={handleGetNumeroOA}
            />
            <BusquedaModelo
                show={showModalModelos}
                handleHideModalModelos={handleHideModalModelos}
                handleGetModelo={handleGetModelo}
                numeroOA={numeroOA}
                oaModelos={oaModelos}
            />
            
            {modelosOAS.length > 0 &&
                <ListOAModelos
                    modelosOAS={modelosOAS}
                />
            }
            <Button 
                className="mt-2 mb-5"
                variant="info"
                onClick={handleEnviar}
                block
            >Enviar Solicitud</Button>
           
        </>
     );
}
 
export default SolicitudRepuestos;

