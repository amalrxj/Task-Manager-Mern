// uploadMiddleware.js
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "/../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9._-]/g, "");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const fileFilter = (_, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 },
});

module.exports = upload;
