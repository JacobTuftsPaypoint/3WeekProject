const { Connection, Request, TYPES } = require("tedious"); //Used to connect to DB
const bcrypt = require('bcrypt'); //Used to Hash password
const jwt = require('jsonwebtoken'); //used to create and read session tokens
const crypto = require("crypto"); //Used to generate the private keys for JWTs
const cosmos = require('@azure/cosmos'); //Used to connect to Cosmos DB NoSQL database
var postmark = require("postmark"); // Used to send emails to users
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
const EmailContainer = Database.container("EmailVerify");


module.exports = function (context, req) {
    context.log('verify/send/POST');

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

            } else if(HTTPPayload.Username){
                //REGEX for the users input to be tested against. This is completed client side to reduce load on the server but also completed server side as the client CANNOT be trusted.
                const CheckUsername = new RegExp(".{1,}")

                if (CheckUsername.test(HTTPPayload.Username)) {
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
                                context.res={status:200,body:"Email Sent, nf"} //FALSE
                                context.done()
                            } else {
                                connection.close();
                            }
                        }
                    )
                    //Defines the query that checks for existing items in database
                    const emailquery = {
                        query:"SELECT * FROM Sessions X WHERE X.Username=@USERNAME",
                        parameters:[
                            {
                                name:"@USERNAME",
                                value: HTTPPayload.Username
                            }
                        ]
                    }
                    //Defines what happens when data is returned by the CheckRequest request
                    CheckRequest.on("row",(columns)=>{
                        console.log(columns[5])
                        if (columns[5]==false) {
                            const token = crypto.randomUUID()
                            bcrypt.hash(token,8,(err,result)=>{
                                if (err) {
                                    context.res={status:500,body:"Hash error, server could not hash token"}
                                    context.done() 
                                } else {
                                    EmailContainer.items.query(emailquery).fetchAll.then((response)=>{
                                        if (response.resources.length>0) {
                                            EmailContainer.item(response.resources[0].id,response.resources[0].id).delete()
                                            console.log("Email token deleted")
                                        }
                                    })
                                    EmailContainer.items.create({UserID:columns[0],Username:columns[1],Token:result}).then((value)=>{
                                        if (value) {
                                            var client = new postmark.ServerClient(process.env["PostmarkString"]);
                                            client.sendEmail({
                                                "From": "jacobtufts@paypoint.com",
                                                "To": "jacobtufts@paypoint.com",
                                                "Subject": "Hello from Postmark",
                                                "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
                                                "TextBody": "Hello from Postmark!",
                                                "MessageStream": "outbound"
                                            });
                                            context.res={status:200,body:"Email Sent"}
                                            context.done()  
                                        } else {
                                            //Cosmos DB failed to create record (no value)
                                            context.res={status:500,body:"Failed to create session, could not communicate with session database"}
                                            context.done()  
                                        }
                                    })
                                }
                            })
                        } else {
                            //Email is already verified
                            context.res={status:200,body:"Email Sent, av"} // FALSE
                            context.done() 
                        }
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
