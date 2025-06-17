import { formModel } from "../Model/formModel.js";
import { removeLocalFile, uploadToCloudinary } from "../Services/CloudinaryUpload.js";

export const formController = async (req, res) => {
  const {
    title,
    author,
    edition,
    isbn,
    category,
    condition,
    price,
    originalPrice,
    description,
    isSold,
    sellerName,
    email,
    state,
    city,
    pinCode,
  } = req.body;
  try {
      if (!req.file) {
    return res.json({ message: "No file uploaded", success: false,status:400 });
  }
    const cloudinaryResult = await uploadToCloudinary(req.file.path);
    const newForm = await formModel.create({
      title,
      author,
      edition,
      isbn,
      category,
      condition,
      price,
      originalPrice,
      description,
      image:cloudinaryResult.public_id,
      isSold,
      sellerName,
      email,
      state,
      city,
      pinCode,
    });
    console.log("Book Form",newForm);
    res.json({message:"Book Form Created Successfullt",sucess:true,status:200})
    removeLocalFile(req.file.path);
  } catch (error) {
    console.log(error);
    res.json({message:error,success:false,status:400});
  }
};
