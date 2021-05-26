# Basic CRUD App with Node, Express and MongoDB

### Installation
- Install node and npm
- Open VS code in project folder and hit `npm init` (to initialise package.json file), entry point : app.js
- Install Express : `npm install express --save`
- Install MongoDB : `npm install mongodb --save`
- Install Mongoose : `npm install mongoose`
- Install Nodemon : `npm install nodemon --save-dev`. This will automatically restart the application when there is any changes. --save-dev means I only install this dependency for development, not production

We have to download mongodb 4.2 from website and run below command to start DB server
```"C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"```

Also also have to set path

##### Rest API Endpoints I gonna use :
GET : http://localhost:9000/aliens
GET : http://localhost:9000/aliens/<id> -- to fetch all aliens from db
POST : http://localhost:9000/aliens
PATCH : http://localhost:9000/aliens/<id>

- To start server and connect with Database : `nodemon run start`

Steps:

