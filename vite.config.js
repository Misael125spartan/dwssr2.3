//importo la funcion de configuracion de  vite
import { defineConfig } from 'vite';
//importo un resolvedor de rutas
import { resolver } from "node:path";
import { resolve } from 'node:dns';
 
//exprotar una instancia de configuracion
export default defineConfig({
    //Directorio raiz de los archivos fuente
    root: 'src',
    // de desarrollo de front-end
    server: {
        port: 5173,
        strictPort: true
    },
 
    //configuracion del build
    build: {
        //Directorio de salida
        outDir: '../dist',
        emptyOutDir: true,
        //Generar un manifiesto
        manifest: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/main.js')
            }
        },
    },
    //configuracion para desarrollo
    publicDir: false,
})