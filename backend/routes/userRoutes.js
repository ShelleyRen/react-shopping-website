const router = require("express").Router();
const {
  authUser,
  getUserProfile,
  registerUser,
  getUserCart,
  updateUserCart,
  findUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddelware");

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/").post(registerUser);
router.route("/reset").post(findUser);
router.route("/cart").get(protect, getUserCart).put(protect, updateUserCart);

module.exports = router;
