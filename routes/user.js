const express = require('express');
const router = express.Router();
const { signIn } = require("../controllers/user");
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } = require("../controllers/user");

// Route to handle user sign-in (Import signIn function)
router.post("/signin", signIn);

// Route to handle user signup
router.post("/signup", handleCreateNewUser);

// Route to get all users
router.get("/", handleGetAllUsers);

// Route to get a user by ID
router.get("/:id", handleGetUserById);

// Route to update a user by ID
router.patch("/:id", handleUpdateUserById);

// Route to delete a user by ID
router.delete("/:id", handleDeleteUserById);

module.exports = router;