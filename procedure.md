# Basic CRUD App with Node, Express and MongoDB

[TOC]

### Installation

- Install node and npm
- Open VS code in project folder and hit `npm init` (to initialize package.json file), entry point : app.js
- Install Express : `npm install express --save`
- Install MongoDB : `npm install mongodb --save`
- Install Mongoose : `npm install mongoose`
- Install Nodemon : `npm install nodemon --save-dev`. This will automatically restart the application when there is any changes. --save-dev means I only install this dependency for development, not production

We have to download mongodb 4.2 from website and run below command to start DB server
```"C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"```

Also also have to set path

### Rest API Endpoints I gonna use :
GET : http://localhost:9000/aliens
GET : http://localhost:9000/aliens/<id> -- to fetch all aliens from db
POST : http://localhost:9000/aliens
PATCH : http://localhost:9000/aliens/<id>

- To start server and connect with Database : `nodemon run start`

### Steps:

#### Step 1 : 



#### Step 2 : 



#### Step 3 : Creating Schema

***Creating Schema in MongoDB and sending schema data to client in GET request.***

Setup a Model view Controller

 - M - Model - Schema (MongoDB)
 - V - View - UI (Frontend)
 - C - Controller - Router (Express and Node)

| RDBMS    | MONGODB     |
| -------- | ----------- |
| Database | Database    |
| Tables   | Collections |
| Rows     | Documents   |
| Columns  | Fields      |


Creating **alienSchema** in `alien.js` in new folder **model/**  and exporting the Schema.
```javascript
const mongoose = require('mongoose')
const alienSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    tech: {
        type: Boolean,
        required: true,
        default: false
    }
})

//Exporting alienSchema as the name of Alien so that our routes aliens.js can access it.
module.exports = mongoose.model('Alien', alienSchema);
```

Now head over to postman and send GET request `http://localhost:9000/aliens`

We'll get Output : []



#### Step 4 :








