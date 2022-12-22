const { Connection, Request, TYPES } = require("tedious"); //Used to connect to DB
const bcrypt = require('bcrypt'); //Used to Hash password

//Config for connecting to the SQL database hosted in Azure. Auth properties should be stored as ENV variables within azure i think, Keystore?? TODO
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

module.exports = function (context, req) {
    context.log('Users/POST');
    
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

            } else if(HTTPPayload.Username && HTTPPayload.Password && HTTPPayload.Email && HTTPPayload.SMS){
                //REGEX for the users input to be tested against. This is completed client side to reduce load on the server but also completed server side as the client CANNOT be trusted.
                const CheckPhone = new RegExp("[0-9]+")
                const CheckEmail = new RegExp("[A-Za-z0-9!#$%&'\*+-/=?^_`{}|~.]+@[A-Za-z0-9-.]+\.[A-Za-z0-9-.]+")
                const CheckPassword = new RegExp(".{8,}")
                const CheckUsername = new RegExp(".+")

                if (CheckPhone.test(HTTPPayload.SMS)&&CheckEmail.test(HTTPPayload.Email)&&CheckPassword.test(HTTPPayload.Password)&&CheckUsername.test(HTTPPayload.Username)) {
                    //Defines request that Inserts a new user into the DB
                    const request = new Request(
                        `INSERT INTO dbo.accounts (Username,Password,Email,SMS,Verified,SMSVerified) VALUES (@Username,@Password,@Email,@SMS,0,0)`,
                        (err)=>{
                            if (err) {
                                //Database was unable to complete the request 
                                connection.close();
                                context.log(err)
                                context.res={status:500,body:"Database Error, Could not complete querry"}
                                context.done()
                            } else {
                                //User has succesfully been created
                                connection.close();
                                context.res={status:200,body:"User Registered"}
                                context.done()
                            }
                        }
                    )
                    //Defines the Request that checks whether a user already exists, if they dont carry out the insertion request
                    const CheckRequest = new Request(
                        `SELECT * FROM  dbo.accounts WHERE Username=@Username OR Email=@Email`,
                        (err,rowCount)=>{
                            if (err) {
                                //Database was unable to complete the request 
                                connection.close();
                                context.log(err)
                                context.res={status:500,body:"Database Error, Could not complete querry"}
                                context.done()
                            } else if(rowCount>0){
                                //Entry already exists in database with entered username or email
                                connection.close();
                                context.res={status:400,body:"A User already exists with that Email and/or Username"}
                                context.done()
                            } else {
                                //Execute request to create user
                                connection.execSql(request)
                            }
                        }
                    )
                    bcrypt.hash(HTTPPayload.Password,12,(err,hash)=>{
                        if (err) {
                            //Password could not be hashed for some reason, very unlikely
                            connection.close();
                            context.res={status:500,body:"Hash Error, could not creat account"}
                            context.done()
                        } else {
                            //Send the querry to the database inserting the inpute values as Paramaters rather than ${}, this removes the chance of SQL injection attacks.
                            request.addParameter('Username',TYPES.VarChar,HTTPPayload.Username)
                            request.addParameter('Password',TYPES.VarChar,hash)
                            request.addParameter('Email',TYPES.VarChar,HTTPPayload.Email)
                            request.addParameter('SMS',TYPES.VarChar,HTTPPayload.SMS)

                            CheckRequest.addParameter('Username',TYPES.VarChar,HTTPPayload.Username)
                            CheckRequest.addParameter('Email',TYPES.VarChar,HTTPPayload.Email)

                            connection.execSql(CheckRequest)
                        }
                    })
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
    
    /*
    CREATE TABLE Accounts(
        ID int IDENTITY(1,1) NOT NULL,
        Username VARCHAR(128),
        Password CHAR(60),
        Email VARCHAR(128),
        SMS VARCHAR(50),
        Verified BIT NOT NULL,
        SMSVerified BIT NOT NULL
        CreatedAt DATETIME DEFAULT getdate()
    )
*/
}
