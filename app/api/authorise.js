const ACCESS_TOKEN = process.env.ACCESS_TOKEN
// const ACCESS_TOKEN = "a"
import jwt from 'jsonwebtoken'



export default async function authorisation(headers){
    const auth = headers.get("Authorisation")
    if (!auth){
        return {message:"No authorisation header"}
    }
    else{
        const header_value = auth.split(" ")
        if (header_value.length === 2){
            const token = header_value[1]
            if (!token){
                return {message:"No token"}
            }
            else{
                return new Promise((resolve, reject) => {
                    jwt.verify(token, ACCESS_TOKEN, (error, data) => {
                      if (error) {
                        reject({ message: error.message });  // Reject with the error message
                      } else {
                        resolve({ user:data });  // Resolve with the user data
                      }})})
            
            }
                
        }
        else{
            return {message:"Incorrect authorisation header"}
        }
    }
}
