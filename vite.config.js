// Importo la funcion de configuracion de vite
import{ defineConfig } from 'vite'
// Importo un resolvedor de rutas
import { resolve } from "node:path"
//import tailwind
import tailwindcss from "@tailwindcss/vite";

// Exportar una instancia de configuracion 
export default defineConfig({
    //Directorio raiz de los archivos fuente
    root: 'src',
    //plugins
    plugins: [tailwindcss()],
    //Configuracion del servidor
    //de desarrollo de front-end
    server: {
        port: 5173,
        strictPort: true    
    },

    //Configuracion del build
    build : { 
        //Directorio de salida
        outDir: '../dist',
        emptyOutDir: true,
        //Generar un manifiesto
        manifest: true,
        rollupOptions:{
            input: {
      main: resolve(__dirname, 'src/main.js'),
            }
        },
          
    },
    //Configuracion para desarrollo
    publicDir: false,
})