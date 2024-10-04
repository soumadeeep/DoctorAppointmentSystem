// this is one way to store sesiondata like android sharepref
//Cookies: Suitable for storing session tokens and are automatically sent with requests.
// Local Storage: Good for storing non-sensitive data with persistent storage.
// Session Storage: Ideal for temporary data that should not persist after closing the tab.
// IndexedDB: Best for complex and large-scale data storage needs.
export const generateJsonToken=(user,message,statuscode,res)=>{
     const token=user.generateJsonwebToken();
     const cookieName=user.role==="Admin"?"adminToken":"patientToken"
     //httpOnly: true:

//This ensures that the cookie is accessible only by the server 
//(i.e., JavaScript running on the client-side cannot access this cookie).
//This is a security feature to prevent Cross-Site Scripting (XSS) attacks.
//XSS(Cross-Site Scripting):injection: The attacker injects malicious code (usually JavaScript) into a trusted website. 
//This can happen via forms, URLs, or any user input that is not properly sanitized.


     res.status(statuscode).cookie(cookieName,token,{
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
     }).json({
        success:"true",
        message,
        user,
        token
     })
}