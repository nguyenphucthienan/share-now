const multer = require('multer');

const allowTypes = ['image/png', 'image/jpeg', 'image/gif'];
const fileFilter = (req, { mimetype }, cb) =>
  cb(null, Boolean(allowTypes.indexOf(mimetype) > -1));

const storage = multer.memoryStorage();

module.exports = multer({ storage, fileFilter }).single('image');
