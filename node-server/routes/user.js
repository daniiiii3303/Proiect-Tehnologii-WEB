const express = require("express");
const router = express.Router();
const userController = require("../controllers").user;
const authorize = require("../middleware/authorize");

router.post(
  "/authenticate",
  userController.authenticateSchema,
  userController.authenticate
);
router.post(
  "/register",
  userController.registerSchema,
  userController.register
);
router.get("/", authorize(), userController.getAll);
router.get("/current", authorize(), userController.getCurrent);
router.get("/:id", authorize(), userController.getById);
router.put(
  "/:id",
  authorize(),
  userController.updateSchema,
  userController.update
);
router.delete("/:id", authorize(), userController.delete);

module.exports = router;
