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

Also also have to set path of MongoDB bin folder to use `mongod` command

### Rest API Endpoints I gonna use :
GET : http://localhost:9000/aliens
GET : http://localhost:9000/aliens/<id> -- to fetch all aliens from db
POST : http://localhost:9000/aliens
PATCH : http://localhost:9000/aliens/<id>

- To start server and connect with Database : `nodemon run start`

### Steps:

#### Step 1 : Setup Env and connected with MongoDB server

In ***app.js***, Setup environment and connect with MongoDB server by mongoose.

```javascript
const express = require('express');
const mongoose = require('mongoose');
// AlienDBex is the database name
const url = 'mongodb://localhost/AlienDBex'

// starting express server
const app = express();

// to avoid warning, using useNewUrlParser 
mongoose.connect(url, { useNewUrlParser: true });

// creating connection object, which may take some time.
const con = mongoose.connection;
// Print a message when connected
con.on('open', function() {
    console.log('Conected...');
})
```



#### Step 2 : Getting empty response in GET request

In ***app.js***, created middleware, which will route traffic to alienRouter

```javascript
const alienRouter = require('./routes/aliens') // Creating router for all routing purpose in aliens.js
app.use('/aliens', alienRouter) //Adding a middleware, which will send all '/aliens' request to alienRouter

app.listen(9000, () => {
    console.log('Server started on Port 9000') //listening server
```

In ***routes/aliens.js***, receiving all routes and sending response in GET request on http://localhost:9000/aliens

```javascript
console.log('Hello World')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => { //this will receive all routes and send below in response
    res.send('Get request successfully received.')
})

module.exports = router //export the 'router' module so that app.js can access 'router'
```



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


Creating **alienSchema** in new folder ***model/alien.js***  and exporting the Schema.
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
    subscribed: {
        type: Boolean,
        required: true,
        default: false
    }
})

//Exporting alienSchema as the name of Alien so that our routes aliens.js can access it.
module.exports = mongoose.model('Alien', alienSchema);
```

In ***routes/aliens.js***, Receive the schema and send as a reponse to client 

```javascript
const Alien = require('../model/alien')
router.get('/', async(req, res) => { 
    try {
        const aliens = await Alien.find(); //Finding Alien in db and waiting for response
        res.json(aliens) //sending whole Aliens data as a json format
    } catch (err) {
        res.send('Error ' + err);
    }
})
```

Now head over to Postman and send GET request `http://localhost:9000/aliens`

We'll get Output : []



#### Step 4 : Saving one Alien in Schema

In  ***routes/aliens.js***, I am sending POST request to Save one Alien in Schema

```javascript
router.post('/', async(req, res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        subscribed: req.body.subscribed
    })

    try {
        const a1 = await alien.save()
        res.json(a1)
    } catch (err) {
        res.send('Error ' + err)
    }
})
```

In ***app.js***, we have to specify that we will send json type object.

```javascript
app.use(express.json()) 
```

Now send POST Req from Postman to `http://localhost:9000/aliens`, and enter below value in Body > raw > json

```json
{
    "name": "Swarnadeep",
    "tech": "NodeJS",
    "subscribed": "true"
}
```

Congratulations !! Your data has been saved in database.

Fetch the whole data using GET request by same URL  `http://localhost:9000/aliens`



#### Step 5 : Get one specific Alien

In  ***routes/aliens.js***, getting one specific alien by giving his id as a parameter

```javascript
router.get('/:id', async(req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        if (alien != null) {
            res.json(alien)
        } else {
            res.send('Given id Not Found')
        }
    } catch (err) {
        res.send('Error ' + err);
    }
})
```

For example, in our database we saved two data.

```json
[    
	{
        "subscribed": false,
        "_id": "60adea69e603491c94a7b2fd",
        "name": "Swarnadeep",
        "tech": "Angular",
        "__v": 0
    },
    {
        "subscribed": false,
        "_id": "60adffde91bd251df8b67cfb",
        "name": "Hemant",
        "tech": "Java",
        "__v": 0
    }
]
```

So we send a GET request in postman to `http://localhost:9000/aliens/60adffde91bd251df8b67cfb`

Output : 

```json
{
    "subscribed": false,
    "_id": "60adffde91bd251df8b67cfb",
    "name": "Hemant",
    "tech": "Java",
    "__v": 0
}
```



#### Step 6 : Change Existing data of a Alien

In  ***routes/aliens.js***, getting one specific alien by giving his id as a parameter

```js
router.patch('/:id', async(req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        alien.subscribed = res.body.subscribed
        const a1 = await alien.save()
        res.json(a1)
    } catch (err) {
        res.send('Error: ' + err)
    }
})
```

Then send a PATCH request in postman to `http://localhost:9000/aliens/60adffde91bd251df8b67cfb` with body value as below

```json
{ "subscribed": "true" }
```

