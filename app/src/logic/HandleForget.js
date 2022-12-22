const HandleForget = (Username,error) =>{
    if (Username.length>0) {
        console.log(`Username: ${Username}`)
    } else {
        error("Make sure you have entered your username or email")
    }
}

export default HandleForget