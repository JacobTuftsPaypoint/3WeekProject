const HandleLogin = (Username,Password,error) =>{
    if (Username.length>0 && Password.length>0) {
        console.log(`Username: ${Username}, Password: ${Password}`)
    } else {
        error("Make sure you have entered your username and password!")
    }
}

export default HandleLogin