# TypeScript ArcGIS Boilerplate

## Includes: 

- Dojo & ArcGIS JS API 4.3 type definitions, 
- SASS & customizable build of Calcite Web (entrypoint at `./src/css/index.scss`, built to `./dist/bundle.css`)
- Asynchronous resolution of Esri & Dojo modules via AMD (dojo) using [esri-promise](https://www.npmjs.com/package/esri-promise)
- Synchronous resolution & bundling of local TypeScript (& node) modules with WebPack
- type safe (mostly) boilerplate for building applications with the ArcGIS JS API.

## Installation:

1. Clone the repository
2. Run `npm i` from the root directory
3. Run `npm start` to serve the appliation with hot-reloading from `http://localhost:8000`
4. Run `npm run build` to build the application to `./dist`