// controllers/googleUserController.js
import GoogleUser from "../models/google.model.js";

const googleUserController = {
  // Create a new Google user
  createUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Create new user with plain text password (no hashing)
      const newUser = new GoogleUser({
        email,
        password, // Storing password without hashing
      });

      // Save user to database
      const savedUser = await newUser.save();

      res.status(201).json({
        success: true,
        message: "Google user created successfully",
        data: savedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating Google user",
        error: error.message,
      });
    }
  },

  // Get all Google users (for testing purposes)
  getAllUsers: async (req, res) => {
    try {
      const users = await GoogleUser.find();
      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching Google users",
        error: error.message,
      });
    }
  },
};

export default googleUserController;
