import createError from "http-errors";
import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import hbs from "hbs";
import { fileURLToPath } from "node:url";

// Rutas
import indexRouter from "#routes/index.js";
import usersRouter from "#routes/users.js";
import authorRouter from "#routes/author.js";

// Helper de Vite
import { registerViteHelper } from "./lib/vite.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración del motor de plantillas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// REGISTRO DEL HELPER
registerViteHelper(hbs);

app.use(morgan("dev"));
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
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

export default app;
