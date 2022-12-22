const { Connection, Request, TYPES } = require("tedious"); //Used to connect to DB
const bcrypt = require('bcrypt'); //Used to Hash password
const jwt = require('jsonwebtoken'); //used to create and read session tokens
const crypto = require("crypto"); //Used to generate the private keys for JWTs
const cosmos = require('@azure/cosmos'); //Used to connect to Cosmos DB NoSQL database
const { CosmosClient } = cosmos;

//Config for connecting to the SQL database hosted in Azure. Properties/Keys are stored in app settings, could be moved to KEY store if the app expanded to have many services and developers.
const config = {
    authentication: {
        options: {
            userName: process.env["SQLUsername"],
            password: process.env["SQLPassword"]
        },
        type: "default"
    },
    server: process.env["SQLServer"],
    options: {
        database: "users", 
        encrypt: true,
    }
}

//Connect to Cosmos DB (noSQL database / key:value)
const ConnectionString = process.env["CosmosString"]
const Client = new CosmosClient(ConnectionString);
const Database = Client.database("ODDAuthTokenStore")
const SessionContainer = Database.container("Sessions");


module.exports = function (context, req) {
    context.log('Sessions/POST');

    HTTPContentType = req.headers["content-type"]
    HTTPPayload = req.body;

    if (HTTPContentType==="application/json") {
        //Define connection to SQL database hosted in azure using config object
        const connection = new Connection(config);
        //Code that should run when the function connects to the database
        connection.on("connect", err => {
            if (err) {
                //Server failed to connect to database
                context.res={status:500,body:"Database Error, Could not connect to database"}
                context.done()

            } else if(HTTPPayload.Username && HTTPPayload.Password){
                //REGEX for the users input to be tested against. This is completed client side to reduce load on the server but also completed server side as the client CANNOT be trusted.
                const CheckPassword = new RegExp(".{8,}")
                const CheckUsername = new RegExp(".{1,}")

                if (CheckPassword.test(HTTPPayload.Password)&&CheckUsername.test(HTTPPayload.Username)) {
                    //Defines the Request that checks whether a user exists.
                    const CheckRequest = new Request(
                        `SELECT TOP 1 * FROM dbo.accounts WHERE Username=@Username OR Email=@Username`,
                        (err,rowCount)=>{
                            if (err) {
                                //Database was unable to complete the request 
                                connection.close();
                                context.res={status:500,body:"Database Error, Could not complete querry"}
                                context.done()
                            } else if(rowCount==0){
                                //User does not exist with email / username
                                connection.close();
                                context.res={status:400,body:"Username or password incorrect"}
                                context.done()
                            } else {
                                connection.close();
                            }
                        }
                    )
                    //Defines what happens when data is returned by the CheckRequest request
                    CheckRequest.on("row",(columns)=>{
                        bcrypt.compare(HTTPPayload.Password, columns[2].value,(err,result)=>{
                            if (err) {
                                //Failed to compare passwords
                                context.res={status:500,body:"Hash Error, Could not compare passwords"}
                                context.done()
                            } if (result===true){
                                //Correct password submitted to server
                                //Check Email is verified
                                if (columns[5].value===true) {
                                    //Account has a verified email
                                    //Generate the data to be stored within the JWT
                                    const tokendata={
                                        Username:columns[1].value
                                    }
                                    //Generate UUID to act as key to encrypt JWT
                                    const privkey = crypto.randomUUID()
                                    //Create record in sessions table containing UUID key
                                    SessionContainer.items.create({UserID:columns[0].value,Username:columns[1].value,UserKey:privkey}).then((value)=>{
                                        if (value) {
                                            //Record created succesfully
                                            const token = jwt.sign(tokendata,privkey)
                                            context.res={status:200,headers:{"Set-Cookie":`authtoken=${token}; Secure; HttpOnly; Max-Age=${86400*14}`},body:`password correct`}
                                            context.done()
                                        } else {
                                            //Cosmos DB failed to create record (no value)
                                            context.res={status:500,body:"Failed to create session, could not communicate with session database"}
                                            context.done()  
                                        }
                                    })
                                        
                                    
                                } else {
                                    //Account does not have a verified email
                                    context.res={status:401,body:"Email not verified"}
                                    context.done() 
                                }
                            } else {
                                //Incorrect password submitted to server
                                context.res={status:401,body:"Password Incorrect"}
                                context.done()
                            }
                        })
                    })
                    CheckRequest.addParameter('Username',TYPES.VarChar,HTTPPayload.Username)
                    connection.execSql(CheckRequest)
                } else {
                    //Request had one or more values that did not meet REGEX requirements
                    connection.close();
                    context.res={status:400,body:"One or more account properties were incorrect"}
                    context.done()  
                }
            } else {
                //Request was missing one or more values
                connection.close();
                context.res={status:400,body:"One or more account properties were missing"}
                context.done()
            }
        });
        //Connect to the database (Run above code)
        connection.connect()
    } else {
        //Request was sent without JSON header
        context.res={status:400,body:"Requests must be use application/json as the content-type"}
        context.done()
    }
}
