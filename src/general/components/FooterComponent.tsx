import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";

export const FooterComponent = () => {
  const [showInfo, setShowInfo] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleInfo = () => {
    if (isMobile) setShowInfo((prev) => !prev);
  };

  const redirect = (route: string) => {
    navigate(route);
    setShowInfo(false);
  };
  useEffect(() => {
    setShowInfo(false);
  }, [location.pathname]);
  
  return (
    <div
      onMouseEnter={() => !isMobile && setShowInfo(true)}
      onMouseLeave={() => !isMobile && setShowInfo(false)}
    >
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-dark text-white px-4 py-4"
          >
            <div className="container ">
              <div className="row gy-3 text-center text-md-start">
                <div className="col-12 col-md-4">
                  <h5 className="text-warning">Olimpo Barber Shop</h5>
                  <p className="small">
                    Tu estilo, nuestra pasión. Reserva tus citas fácilmente y
                    mantente impecable.
                  </p>
                </div>

                <div className="col-12 col-md-4">
                  <h5 className="text-warning">Contacto</h5>
                  <p className="small mb-1">
                    <i className="bi bi-telephone me-2"></i>+52 33 4411 8749
                  </p>
                  <p className="small mb-1">
                    <i className="bi bi-facebook me-2"></i>
                    Olimpo Barbershop
                  </p>
                </div>

                <div className="col-12 col-md-4">
                  <h5 className="text-warning">Legal</h5>
                  <ul className="list-unstyled small">
                    <li>
                      <span
                        onClick={() => redirect("/terms")}
                        className="text-white text-decoration-none"
                        role="button"
                        style={{ cursor: "pointer" }}
                      >
                        Términos y Condiciones
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() => redirect("/privacity")}
                        className="text-white text-decoration-none"
                        role="button"
                        style={{ cursor: "pointer" }}
                      >
                        Aviso de Privacidad
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-dark text-white pt-4 pb-3 mt-0">
        <div className="container">
          <div
            className="text-center small"
            style={{ cursor: "pointer" }}
            onClick={toggleInfo}
          >
            &copy; {new Date().getFullYear()} Olimpo Barber Shop. Todos los
            derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};
