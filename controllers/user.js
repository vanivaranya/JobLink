const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign-in controller
async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    // Log the received request parameters
    console.log('Received sign-in request:', { email });

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Incorrect password for user:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token using the environment variable for the secret key 
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Log the successful sign-in and token generation
    console.log('User signed in successfully:', { email, userId: user._id });

    res.json({ token });
  } catch (error) {
    // Log any errors that occur during sign-in process
    console.error('Sign-in error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
async function handleGetAllUsers(req, res) {
  try {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
  } catch (error) {
    console.error("Error in User.find:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGetUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleUpdateUserById(req, res) {
  try {
    const userId = req.params.id;
    const updateFields = req.body;

    // Filter out undefined or null values
    const filteredUpdateFields = Object.fromEntries(Object.entries(updateFields).filter(([key, value]) => value !== undefined && value !== null));

    // If password update is included, handle hashing
    if (filteredUpdateFields.password) {
      const salt = await bcrypt.genSalt(10);
      filteredUpdateFields.password = await bcrypt.hash(filteredUpdateFields.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, filteredUpdateFields, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ status: 'Success', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function handleDeleteUserById(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleCreateNewUser(req, res) {
  try {
    const body = req.body;

    // Validate request body (including password)
    if (!body || !body.full_name || !body.email || !body.phone || !body.password ||
        !body.gender || !body.skill || !body.location || !body.time_slot ||
        !body.age || !body.work_experience || !body.minimum_salary) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash password before saving the user
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    const newUser = new User(body);
    await newUser.save();

    // Consider sending only relevant user data upon successful creation (excluding password)

    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  signIn,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
