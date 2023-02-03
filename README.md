
![Logo](https://saigyou-ayakash.com/images/logo.svg)


# Saigyou-ayakash

Saigyou-ayakash is a personal website/application for the management of my miniatures collection
This one allows to add, delete, modify a figurine.

It also allows to have global statistics on the collection like the total price, the number of figurine, as well as the date of the last addition.

Finally there is also a wish list or for future purchases


## Installation

To use the project you will need **yarn** :
```bash
npm install --global yarn
```

To install the project you just have to run (in the root) :
```bash
yarn setup
```
    
## Commands for run this project
Client : 
```bash
yarn client
```

Server :
```bash
yarn server
```

Client and Server :
```bash
yarn dev
```

## Environment Variables

To **run this project**, you will **need** to add the following environment variables to your **.env file**

**client** :
`VITE_API_BASE_URL`

**server** :
`JWT_ISSUER`
`JWT_SECRET`
`MONGODB_URL`
`SERVER_HOST`
`SERVER_PORT`


## Dependencies

Client dependencies :
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

## 

Server dependencies :
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
## Authors

- [@ydainna](https://www.github.com/ydainna)


## License

[MIT](https://choosealicense.com/licenses/mit/)
All rights reserved