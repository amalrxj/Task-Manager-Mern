const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const rawUrl = req.file.path; // this is the original Cloudinary URL

  // Inject optimization parameters manually
  const optimizedUrl = rawUrl.replace(
    "/upload/",
    "/upload/w_100,h_100,c_fill,f_auto,q_auto/"
  );

  return res.status(200).json({ imageUrl: optimizedUrl });
});

module.exports = router;
