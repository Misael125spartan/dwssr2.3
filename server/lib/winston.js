// importamos la biblioteca de winston
import winston, { format } from "winston";
import path from "node:path";
import fs from "node:fs";
// importando biblioteca de transporte
import DailyRotateFile from "winston-daily-rotate-file";

//Desestructurando funciones de format
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

// Creando los directorios de raiz (Corregido a __rootdir)
const __rootdir = path.resolve(process.cwd());

//Creando la ruta de logs en la raiz del proyecto
const logsDir = path.join(__rootdir, "logs");

//Rutina que crea la carpeta donde iran los logs solo en caso de no existir
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

//Definiendo esquemas de colores
const colors = {
  error: "red",
  warn: "yellow", // Corregido "yellon"
  info: "magenta",
  debug: "blue",
};

//Agregando esquemas de colores de winston
winston.addColors(colors);

//creamos los formatos de salida para los diferentes transportes
const myConsoleFormat = combine(
  //agregando colores a este formato
  colorize({ all: true }),
  //agregando una etiqueta a este formato
  label({ label: "📢" }),
  //agregando formato de fecha
  timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  //funcion de impresion (Corregido info.label)
  printf(
    (info) => `${info.level}: ${info.label} ${info.timestamp}: ${info.message}`,
  ),
);

//Formato para los archivos
const myFileFormat = combine(
  //Quitando colorizacion
  format.uncolorize(),
  //Agregando fechas en formato ISO
  timestamp(),
  //Salida en formato JSON
  format.json(),
);

// Creando el objeto de opciones para cada transporte (Unificado y corregido)
const options = {
  errorFile: {
    level: "error",
    filename: path.join(__rootdir, "logs", "error.log"),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: myConsoleFormat,
  },
  readableFile: {
    filename: path.join(logsDir, "app-readable.log"),
    level: "info",
    format: combine(
      format.uncolorize(),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      prettyPrint(),
    ),
    maxsize: 5242880,
    maxFiles: 5,
  },
  dailyRotateFile: {
    filename: path.join(logsDir, "app-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "info",
    format: myFileFormat,
  },
};

//Creando una instancia del logger
/**
 * Usaremos un transporte diario (DailyRotateFile) para
 * el log principal, esto facilita la retencion
 * por fechas y la compresion de archivos
 *
 * Para los demas logs mantenemos archivos separados.
 */

const logger = winston.createLogger({
  transports: [
    //log principal con rotacion por fecha
    new DailyRotateFile(options.dailyRotateFile),
    //Archivo legible para humanos
    new winston.transports.File(options.readableFile),
    // Log de errores en un archivo por separado
    new winston.transports.File(options.errorFile),
    // Log para la consola de desarrollo (colores y formato, corregido a options.console)
    new winston.transports.Console(options.console),
  ],
  //Captura de excepciones (Corregido transport a transports)
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, "exception.log"),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, "rejection.log"),
    }),
  ],
  exitOnError: false,
});

//Finalmente exportamos el logger (Agregada la instrucción)
export default logger;
