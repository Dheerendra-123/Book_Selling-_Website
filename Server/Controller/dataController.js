import { formModel } from "../Model/formModel.js"

export const getBooks=async(req,res)=>{
    try{
    const getAllBooks=await formModel.find();
    if(!getAllBooks){
        return res.json({message:'Did Not Found Any Books Data',success:false,status:401});
    }
    else return res.json({message:'All Books Data has been Fetched',success:true,status:200,getAllBooks});
}catch(error){
    console.log(error);
    res.json({message:'Fetching Data of Books Failed',success:false,status:401});
}
}

export const getBookDetailById=async(req,res)=>{
    const id=req.params.id;
    try{
        const bookData=await formModel.findById(id);
        if(bookData){
            return res.json({message:'Book Data has been Fetched',success:true,status:200,bookData});
        }
        else{
            return res.json({message:'Did Not Found Any Book Data',success:false,status:401});
        }
    }catch(error){
        console.log(error);
        res.json({message:'Fetching Data of Book is Failed',success:false,status:401});
    }
}

