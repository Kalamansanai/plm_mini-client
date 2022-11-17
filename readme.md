## 
 - Install dependencies: `npm install`
 - Build for production: `npm run build`
 - Run (development): `npm run dev`
 - Run (production): `npm run check`
 - Run typescript type checker: `npm run check`

## Before pushing or submitting a PR:
 - make sure that all changed source files have been formatted using Prettier (configuration is
   included in project)
 - make sure that `npm run check` returns with no warnings
 - clean up any unnecessary console.logs 

## API client

The project includes a generated API client using the OpenAPITools typescript-fetch generator. 

https://github.com/OpenAPITools/openapi-generator/blob/master/docs/generators/typescript-fetch.md

Each time you want to adapt the frontend to a new backend API version, you have to:
 0. Install the generator (See https://github.com/OpenAPITools/openapi-generator for options)
 1. Get the new `swagger.json` (TODO: make the backend build process spit out the `swagger.json`)
 2. Run the command: `openapi-generator-cli generate -i swagger.json -o api_client -g
    typescript-fetch --additional-properties="supportsES6,withoutRuntimeChecks=true"`
 3. Replace `api_client` directory in client project with the new one

I hope to automate this process in the future, but you'll have to install the generator either way
