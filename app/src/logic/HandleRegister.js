const HandleRegister = (Username,Password,ConfirmPassword,Email,error)=>{
    if (Username.length>0 && Password.length>0 && ConfirmPassword.length>0 && Email.length>0) {
        if (Password===ConfirmPassword) {
            if (Password.length>=8) {
                if (Password!=Username) {
                    const tester = new RegExp("[A-Za-z0-9!#$%&'\*+-/=?^_`{}|~.]+@[A-Za-z0-9-.]+\.[A-Za-z0-9-.]+") 
                    console.log(tester.test(Email))
                    if (tester.test(Email)) {
                        console.log(`Username: ${Username}, Email: ${Email}, Password: ${Password}`) //send to server
                    } else {
                        error("Make sure your email is in the correct format")
                    }
                } else {
                    error("Make sure your password isn't the same as your username!")
                }
            } else {
                error("Make sure your password is atleast 8 Characters!")
            }
        } else {
            error("Make sure your passwords match!")
        }
    } else {
        error("Make sure you have entered all the required information!")
    }
}

export default HandleRegister

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every