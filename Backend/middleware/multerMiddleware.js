const multer= require('multer') 

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename : (req,file,callback)=>{
        callback(null,`image-${Date.now()}-${file.originalname}`)
    }
})

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only image files are allowed"), false);
//     }
//   };
const multerMiddleware =multer({
    storage
})
module.exports = multerMiddleware