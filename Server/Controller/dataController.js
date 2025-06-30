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


export const getBooksByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const books = await formModel.find({ userId });
    res.json({ books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const removeBookListed = async (req, res) => {
  try {
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ success: false, message: "No bookId provided" });
    }

    const result = await formModel.deleteOne({
      _id: bookId,
      userId: req.user.id, // ensure only the creator can delete
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Book not found or already removed" });
    }

    console.log(`✅ Book with ID ${bookId} deleted by user ${req.user.id}`);
    res.json({ success: true, message: "Removed book from booklisted" });

  } catch (error) {
    console.error("❌ Error in removeBookListed:", error.message);
    res.status(500).json({ success: false, message: "Server error while removing book" });
  }
};



