// // middleware/imageUploader.js
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import cloudinary from '../Config/cloudinaryConfig.js';

// // Handle __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../uploads/'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// // File filter to accept only images
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Not an image! Please upload only images.'), false);
//   }
// };

// // Initialize multer upload
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB max file size
//   },
//   fileFilter: fileFilter
// });

// // Function to upload file to Cloudinary
// const uploadToCloudinary = async (filePath) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: 'lostAndFound',
//       use_filename: true
//     });
//     // console.log(result);
    
//     return {
//       url: result.secure_url,
//       public_id: result.public_id
//     };
//   } catch (error) {
//     throw new Error(`Error uploading to Cloudinary: ${error.message}`);
//   }
// };

// const removeLocalFile = (filePath) => {
//   try {
//     // console.log('Trying to remove:', filePath);
//     fs.unlinkSync(filePath);
//     console.log('Removed:', filePath);
//   } catch (error) {
//     console.error('Error removing local file:', filePath, error.message);
//   }
// };


// export { upload, uploadToCloudinary, removeLocalFile };


import multer from 'multer';
import cloudinary from '../Config/cloudinaryConfig.js';

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Direct upload to Cloudinary from buffer
const uploadToCloudinary = async (fileBuffer, originalname) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'lostAndFound',
          use_filename: true,
          unique_filename: true,
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) {
            reject(new Error(`Error uploading to Cloudinary: ${error.message}`));
          } else {
            resolve({
              url: result.secure_url,
              public_id: result.public_id
            });
          }
        }
      );
      
      uploadStream.end(fileBuffer);
    });
  } catch (error) {
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};

// Function to delete from Cloudinary (useful for cleanup)
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error.message);
    throw error;
  }
};

export { upload, uploadToCloudinary, deleteFromCloudinary };
