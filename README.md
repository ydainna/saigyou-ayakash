
![Logo](https://saigyou-ayakash.com/images/logo.svg)


# Saigyou-ayakash

Saigyou-ayakash is a personal website/application for the management of my miniatures collection
This one allows to add, delete, modify a figurine.

It also allows to have global statistics on the collection like the total price, the number of figurine, as well as the date of the last addition.

Finally there is also a wish list or for future purchases


## Installation

To use the project you will need **yarn** and **turbo**:
```bash
npm install --global yarn
npm install --global turbo
```

To install the project you just have to run (in the root) :
```bash
yarn install
```
    
## Commands for run this project
Client : 
```bash
yarn dev:front
```

Server :
```bash
yarn dev:back
```

Client and Server :
```bash
yarn dev
```

## Commands for build this project
Client : 
```bash
yarn build:front
```

Server :
```bash
yarn build:back
```

Client and Server :
```bash
yarn build
```

## Commands for clean this project
```bash
yarn clean
```

**clean** delete **node_modules** (front/back) and dist (front/back)

## Environment Variables

To **run this project**, you will **need** to add the following environment variables to your **.env file**

**front** :
`VITE_API_BASE_URL`

**back** :
`JWT_ISSUER`
`JWT_SECRET`
`MONGODB_URL`
`SERVER_HOST`
`SERVER_PORT`


## Dependencies

Template dependencies :
- [turbo](https://turbo.build/repo)
- [cross-env](https://github.com/kentcdodds/cross-env)

Front dependencies :
- [typescript](https://www.typescriptlang.org/)
- [react](https://fr.reactjs.org/)
- [vitejs](https://vitejs.dev/)
- [MUI](https://mui.com/material-ui)
- [sass](https://sass-lang.com/)
- [react-query](https://react-query-v3.tanstack.com/)
- [valtio](https://valtio.pmnd.rs/)
- [axios](https://axios-http.com/)
- [node-forge](https://github.com/digitalbazaar/forge)
- [tslog](https://tslog.js.org/#/)
- [react-router](https://reactrouter.com/en/main)
- [react-toastify](https://fkhadra.github.io/react-toastify/introduction)
- [react-icons](https://react-icons.github.io/react-icons/)
- [react-mui-fileuploader](https://github.com/rouftom/react-mui-fileuploader)
- [jwt-decode](https://github.com/auth0/jwt-decode)
- [sentry](https://sentry.io)

## 

Back dependencies :
- [typescript](https://www.typescriptlang.org/)
- [node](https://nodejs.org/en/)
- [HAPI and plugins](https://hapi.dev/)
- [dotenv](https://github.com/motdotla/dotenv)
- [joi](https://joi.dev/api/?v=17.7.0)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [tslog](https://tslog.js.org/#/)
- [mongoose](https://mongoosejs.com/)
- [moment](https://momentjs.com/)
- [moment-timezone](https://momentjs.com/timezone/)
- [uuid](https://github.com/uuidjs/uuid)
- [cross-env](https://github.com/kentcdodds/cross-env)
- [sentry](https://sentry.io)

## Authors

- [@ydainna](https://www.github.com/ydainna)

## License

[MIT](https://choosealicense.com/licenses/mit/)
All rights reserved
