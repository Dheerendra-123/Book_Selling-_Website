export const Validation=async(req,res,next)=>{
    const {email}=req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zAslZ]{2,}$/;
    const isValidate=emailRegex.test(email);
    if(!isValidate){
       return res.json({message:"Enter Correct Email Id",sucess:false})
    }
    next();
}