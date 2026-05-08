import express from "express";

const router = express.Router();
// import logger (CORREGIDO: L minúscula)
import logger from "../lib/winston.js";
import { rootCertificates } from "node:tls";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Proyecto Asombroso 💫💫",
    author: "Misael de Jesus",
  });
});

//rutas para pruebas de logs
router.get("/test-logs", (req, res) => {
  //generar logs
  logger.error("Esto es una prueba del log tipo Error");
  logger.warn("Esto es una prueba del log tipo Warn");
  logger.info("Esto es una prueba del log tipo Info");
  logger.http("Esto es una prueba del log tipo Http");
  logger.debug("Esto es una prueba del log tipo Debug");

  // estructurando respuestas
  res.json({
    message: "se crearon logs de prueba",
    archivos: ["logs/app-YYYY-MM-DD.logs"],
  });
});

//Rutas  para pruebas de exception y rejections
if (process.env.NODE_ENV !== "production") {
  //Habilitando rutas para

  router.get("/test-exception", (req, res) => {
    res.json({
      message: "Excepcion lanzada. Resisa logs/exception.log",
    });
    // lanzado excepcion
    setTimeout(() => {
      throw new Error("Excepcion de prueba no capturada");
    }, 300);
  });
  //Rutas para Rejections
  //Acceso: GET /test-rejection
  router.get("/test-rejection", (req, res) => {
    res.json({
      message: "Promeza rechazada. Revisa logs/rejection.log",
    });
    //lanzando exceptiontch
    Promise.reject(new Error("Promesa rechada sin catch"));
  });
}

export default router;
