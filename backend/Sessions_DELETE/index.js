const jwt = require('jsonwebtoken'); //used to create and read session tokens
const cosmos = require('@azure/cosmos'); //Used to connect to Cosmos DB NoSQL database
var cookie = require('cookie'); //parse cookies contained within request
const { CosmosClient } = cosmos;



//Connect to Cosmos DB (noSQL database / key:value)
const ConnectionString = process.env["CosmosString"]
const Client = new CosmosClient(ConnectionString);
const Database = Client.database("ODDAuthTokenStore")
const SessionContainer = Database.container("Sessions");


module.exports = function (context, req) {
    context.log('Sessions/DELETE');

    HTTPContentType = req.headers["content-type"]
    HTTPPayload = req.body;

    //Parse the cookies received by the server
    const cookies = cookie.parse(req.headers["cookie"])

    if (HTTPContentType==="application/json") {
        //Check cookies contain authtoken cookie
        if (cookies["authtoken"]) {
            //Decode the token without verification to get username and check against DB to get key to verify
            const Decoded = jwt.decode(cookies.authtoken)
            const sessionquerry = {
                query:"SELECT * FROM Sessions X WHERE X.Username=@USERNAME",
                parameters:[
                    {
                        name:"@USERNAME",
                        value: Decoded.Username
                    }
                ]
            }
            //Get all keys from session store which are based on found username
            SessionContainer.items.query(sessionquerry).fetchAll().then((response)=>{
                if (response.resources.length>0) {
                    //one or more keys
                    const secondsSinceEpoch = Math.round(Date.now() / 1000)
                    //keep track if there are no matches
                    let nomatch = 0
                    //itterate through all keys found
                    response.resources.forEach(element => {
                        //Check key was created within 2 weeks
                        if ((element._ts)-secondsSinceEpoch<(86400*14)) {
                            //in date
                            jwt.verify(cookies["authtoken"],element.UserKey,((err,decoded)=>{
                                if (decoded) {
                                    //provided token matched session in database
                                    SessionContainer.item(element.id,element.id).delete().then(value=>{
                                        if (value.statusCode==204) {
                                            //Record was deleted
                                            //Return a cookie with 0 max age so that it instantly deletes, This prevents a build up of cookies with the same name.
                                            context.res={status:200,headers:{"Set-Cookie":`authtoken=null; Secure; HttpOnly; Max-Age=${0}`},body:"Logged Out"}
                                            context.done()
                                        } else {
                                            //Cosmos failed to delete
                                            context.res={status:400,body:"Cannot remove session, Database error"}
                                            context.done()
                                        }
                                    })
                                } else {
                                    //Itteration without match increase counter
                                    nomatch += 1
                                }
                            }))
                        } else {
                            //Found a key that has expired, removing the clean database
                            console.log("session deleted, expired")
                            SessionContainer.item(element.id,element.id).delete()
                        }
                    });
                    //Check whether code found a match
                    if (nomatch===response.resources.length) {
                        //Key provided by user does not match any in database
                        context.res={status:400,body:"Cannot remove session, User not logged in, client"}
                        context.done()
                    }
                } else {
                    //No Valid sessions were found on the server matching the user
                    context.res={status:400,body:"Cannot remove session, User not logged in, server"}
                    context.done()
                }
            })
        } else {
            //Request was sent without authtoken
            context.res={status:400,body:"No authtoken"}
            context.done()
        }
    } else {
        //Request was sent without JSON header
        context.res={status:400,body:"Requests must be use application/json as the content-type"}
        context.done()
    }
}
