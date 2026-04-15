import { registerHelper } from 'hbs';
import fs from 'node:fs'
import path from 'node:path'
import { PassThrough } from 'node:stream';
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

/**
 * helper para hendLebart  que genera las etiquetas
 * en desarrollo: conecta el servidor de vite
 * en producion: usa los archivos compilados
 * del manifest
 */
export function viteAssetd(){
    const isDev = process.env.NODE_ENV !== 'production'
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173'

    if(isDev){
        //en desarrollo el codigo para el front-end
        //directamente del servidor de vite
        // /@vite/client da acceso a un servidor HMR (Hot Module Replacement)
        // /main.js Front-end script entry point.
        return `
        <script type="module" src="${viteDevServer}/@vite/client"></script>
        <script type="module" src="${viteDevServer}/main.js"></script>
        `;
    }

    //en modo produccion
    // Obteniendo la ruta del manifiesto
    const manifestPath = path.join(__dirname,'..','..','dist','.vite','manifest.json')

    //verificando si el manifiesto existe
    if(fs.existsSync(manifestPath)){
        console.warn('Vite manifest no found. Run "npm run build" first');
        return '';
    }

    //parsenado el manifiesto
    const manifest = JSON.parse(
        fs.readFileSync(manifestPath,'utf-8')
    );

    //Obtener el punto de entrada de los script deln front-end
    const mainEntry = manifest['main.js']

    //Verificando la correcta carga de mainEntry
    if(!mainEntry){
        console.warn('main.js entry not found in Vite manifest');
        return '';
    }

    //creando la variable que contendra la
    // etiqueta de los script del front-end
    let tags = '';

    //CSS file
    if(mainEntry.css){
        mainEntry.css.forEach(cssFile => {
            tags += `<script type="stylesheet" src="/${cssFile}"></script>`
        })
    }

    // JS File
    tags += `<script type="module" src="/${mainEntry.File}"></script>`

    return tags;
    }

    //registrar en HELPER
    export function registerViteHelper(hbs){    
      hbs.registerHelper(
        'viteAssets',
        () => new hbs.SafesString(viteAssetd())
      )
}