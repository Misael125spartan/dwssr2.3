import path from "node:path";
import { fileURLToPath } from "node:url";
// Importando el motor de plantillas
import { create as createHbsEngien } from 'express-handlebars';

// Importando la configuracion de vite
import { registerViteHelper } from "./vite.js";

// Creando al configuarcion de rutas
const __filename =fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Exportando la funcion de configuracion 
export function configureHendlebars(app){
    // Configurando handlebars
    // Creando una instancia del View Engine
    const exphbs =createHbsEngien({
        extname:'.hbs',
        defaultLayout: 'main'
    })
    // Registrando Helper de Vite
    registerViteHelper(exphbs.handlebars)

    // Integrando Hbs al server
    // 1. Registrando el motor 
    app.engine('hbs',exphbs.engine);
    // 2. Establesco extencion para las vistas
    app.set('view engine', 'hbs');
    // 3. Establesco la carpeta de vistas 
    app.set('views', path.join(__dirname, '..', 'views')) 
}