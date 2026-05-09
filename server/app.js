import createError from "http-errors";
import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// Importando Winston logger (en minúscula para seguir el estándar)
import logger from "./lib/winston.js";
import hbs from "hbs";
import { fileURLToPath } from "node:url";

// Rutas
import indexRouter from "#routes/index.js";
import usersRouter from "#routes/users.js";
import authorRouter from "#routes/author.js";

// Helper de Vite
import { registerViteHelper } from "./lib/vite.js";

// ELIMINADO: import { loggers } from "winston"; <-- Esto causaba el error

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración del motor de plantillas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// REGISTRO DEL HELPER
registerViteHelper(hbs);

// Redirigiendo el flujo de logs de morgan a winston
// morgan ---> [logs] ---> Winstons ---> transportes
app.use(
  morgan("dev", {
    stream: {
      // Usamos 'logger' (el que importamos) y su nivel '.info'
      write: (msg) => logger.info(msg.trim()),
    },
  }),
);

// ELIMINADO: app.use(morgan("dev")); <-- Estaba duplicado

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ARCHIVOS ESTÁTICOS: Ahora funcionan en Dev y Prod
app.use(express.static(path.join(__dirname, "../public")));

// Rutas
app.use(["/", "/index"], indexRouter);
app.use("/users", usersRouter);
app.use("/author", authorRouter);

// Manejo de errores
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res,) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

export default app;
