// import { formModel } from "../Model/formModel.js";
// import { removeLocalFile, uploadToCloudinary } from "../Services/CloudinaryUpload.js";

// export const formController = async (req, res) => {
//   const {
//     title,
//     author,
//     edition,
//     isbn,
//     category,
//     type,
//     condition,
//     price,
//     originalPrice,
//     description,
//     isSold,
//     sellerName,
//     email,
//     state,
//     city,
//     whatsapp,
//     contact,
//     pinCode,
   
//   } = req.body;

//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.json({ message: "No files uploaded", success: false, status: 400 });
//     }

//     // Upload all images to Cloudinary
//     const uploadPromises = req.files.map(file => uploadToCloudinary(file.path));
//     const cloudinaryResults = await Promise.all(uploadPromises);

//     // Extract public_id or url from Cloudinary results
//     const urls = cloudinaryResults.map(result => result.url);

//     const newForm = await formModel.create({
//       title,
//       author,
//       edition,
//       isbn,
//       category,
//       type,
//       condition,
//       price,
//       originalPrice,
//       description,
//       images: urls, 
//       isSold,
//       sellerName,
//       email,
//       whatsapp,
//       contact,
//       state,
//       city,
//       userId: req.user._id,
//       pinCode,
//     });

//     console.log("Book Form", newForm);

//   req.files.forEach(file => removeLocalFile(file.path));

//     res.json({
//       message: "Book Form Created Successfully",
//       success: true,
//       status: 200
//     });

//     // Cleanup local files
  

//   } catch (error) {
//     console.log(error);
//         if (req.files) {
//       req.files.forEach(file => removeLocalFile(file.path));
//     }
//     res.json({ message: error.message, success: false, status: 400 });
//   }
// };


import { formModel } from "../Model/formModel.js";
import { uploadToCloudinary } from "../Services/CloudinaryUpload.js";

export const formController = async (req, res) => {
  const {
    title,
    author,
    edition,
    isbn,
    category,
    type,
    condition,
    price,
    originalPrice,
    description,
    isSold,
    sellerName,
    email,
    state,
    city,
    whatsapp,
    contact,
    pinCode,
  } = req.body;

  try {
    if (!req.files || req.files.length === 0) {
      return res.json({ 
        message: "No files uploaded", 
        success: false, 
        status: 400 
      });
    }

    // Upload all images to Cloudinary directly from buffer
    const uploadPromises = req.files.map(file => 
      uploadToCloudinary(file.buffer, file.originalname)
    );
    
    const cloudinaryResults = await Promise.all(uploadPromises);

    // Extract URLs from Cloudinary results
    const urls = cloudinaryResults.map(result => result.url);

    const newForm = await formModel.create({
      title,
      author,
      edition,
      isbn,
      category,
      type,
      condition,
      price,
      originalPrice,
      description,
      images: urls,
      isSold,
      sellerName,
      email,
      whatsapp,
      contact,
      state,
      city,
      userId: req.user._id,
      pinCode,
    });

    console.log("Book Form", newForm);

    res.json({
      message: "Book Form Created Successfully",
      success: true,
      status: 200,
      data: newForm
    });

  } catch (error) {
    console.error("Form creation error:", error);
    res.json({ 
      message: error.message, 
      success: false, 
      status: 400 
    });
  }
};