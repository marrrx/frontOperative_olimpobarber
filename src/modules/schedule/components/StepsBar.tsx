import React from 'react'
import '../styles/styles.css'

export const StepsBar = () => {
  return (
<div className="d-flex justify-content-center align-items-center mt-5">
  <div className="text-center me-3 ms-3 d-flex flex-column align-items-center">
    <div className="d-flex justify-content-center align-items-center bg-secondary cirlceStep">1</div>
    <p className="d-none d-md-block label_step">Seleccionar sucursal</p>
  </div>

  <div className="spacer d-none d-lg-block"></div>

  <div className="text-center me-3 ms-3 d-flex flex-column align-items-center">
    <div className="d-flex justify-content-center align-items-center bg-secondary cirlceStep">2</div>
    <p className="d-none d-md-block label_step">Seleccionar barbero</p>
  </div>

  <div className="spacer d-none d-lg-block"></div>

  <div className="text-center me-3 ms-3 d-flex flex-column align-items-center">
    <div className="d-flex justify-content-center align-items-center bg-secondary cirlceStep">3</div>
    <p className="d-none d-md-block label_step">Seleccionar servicios</p>
  </div>

  <div className="spacer d-none d-lg-block"></div>

  <div className="text-center me-3 ms-3 d-flex flex-column align-items-center">
    <div className="d-flex justify-content-center align-items-center bg-secondary cirlceStep">4</div>
    <p className="d-none d-md-block label_step">Seleccionar fecha</p>
  </div>

  <div className="spacer d-none d-lg-block"></div>

  <div className="text-center ms-3 me-3 d-flex flex-column align-items-center">
    <div className="d-flex justify-content-center align-items-center bg-secondary cirlceStep">5</div>
    <p className="d-none d-md-block label_step">Confirmar</p>
  </div>
</div>  )
}
