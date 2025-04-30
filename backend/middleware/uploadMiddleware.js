const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Ensures the image is saved in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);  // Creates a unique filename based on timestamp
    },
});

// File filter to accept only specific image formats
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);  // Accept the file if it's an allowed type
    } else {
        cb(new Error('Only .jpeg .jpg and .png formats are allowed'), false);  // Reject the file
    }
};

// Multer configuration with storage and file filter
const upload = multer({ storage, fileFilter });

module.exports = upload;
