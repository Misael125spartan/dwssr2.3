// importamos la biblioteca de winston
import winston, { format, level } from "winston";
import path from "node:path";
import fs from "node:fs";
// importando biblioteca de transporte
import DailyRotateFile from "winston-daily-rotate-file";
import { error, info, warn } from "node:console";

//Desestructurando funciones de format
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

// Creando los directotios de raiz

const __roodir = path.resolve(process.cwd());

//Creando la ruta del logs en
//la raiz del proyecto
const logsDir = path.join(__roodir, "logs");
//Rutina que crea la carpeta donde iran los logs solo
//en caso de no existir
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

//Definiendo esquemas de colores
const colors = {
  error: "red",
  warn: "yellon",
  info: "magenta",
  debug: "blue",
};

//Agregando esquemas de colores de winston
winston.addColors(colors);

//creamos los fromatos de salida para los diferentes transportes
const myConsoleFormat = combine(
  //agregando colores a este formato
  colorize({ all: true }),
  //agregando una etiqueta a este formato
  label({ label: "📢" }),
  //agregando formaro de fecha
  timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  //funcion ede impresion
  printf(
    (info) =>
      `${info.level}: ${info.level}: ${info.timestamp}: ${info.message}`,
  ),
);

//Formato para los archivos
const myFileFormat = combine(
  //Quitando colorizacion
  format.uncolorize(),
  //Agregando fechas en formato ISO
  timestamp(),
  //Salida en formaro JSON
  format.json(),
);

//Crrando los trasnporte
const options = {
  errorFile: {
    level: "error",
    filename: path.join(__roodir, "logs", "error.logs"),
    maxsize: 1048576, //1MB
    format: myFileFormat,
  },
};
