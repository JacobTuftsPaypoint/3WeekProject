const { Connection, Request } = require("tedious");
    
module.exports = function (context, req) {
    context.log('Users/POST');

    const config = {
        authentication: {
            options: {
                userName: "ODDAuthAdmin",
                password: "ODD@ManagedAuth"
            },
            type: "default"
        },
        server: "oddauthsqlserver.database.windows.net",
        options: {
            database: "users", 
            encrypt: true
        }
    }

    const connection = new Connection(config);

    connection.on("connect", err => {
        if (err) {
            context.res={status:500,body:"Database Error, Could not connect to users database"}
            context.done()
        } else {
            context.res={status:200,body:"connected"}
            context.done()
        }
        connection.close();
    });

    connection.connect()
    

    //END OF PROGRAM
    //context.res={status:500,body:"Unknown server failure"}

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