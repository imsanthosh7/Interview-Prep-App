import multer from 'multer';
import path from "path";

// configure storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1].toLowerCase(); // e.g., jpeg, png
        const nameWithoutExt = path.parse(file.originalname).name.replace(/\s+/g, '-'); // removes spaces
        cb(null, `${Date.now()}-${nameWithoutExt}.${extension}`);
    }

})


// file filter 
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false)
    }

}

const upload = multer({ storage, fileFilter });

export default upload;