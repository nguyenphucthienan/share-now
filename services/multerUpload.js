const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');

const allowTypes = ['image/png', 'image/jpeg', 'image/gif'];
const fileFilter = (req, { mimetype }, cb) =>
  cb(null, Boolean(allowTypes.indexOf(mimetype) > -1));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './publics/images/uploads');
  },
  filename: (req, file, cb) => {
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  },
});

module.exports = multer({ storage, fileFilter }).single('image');
