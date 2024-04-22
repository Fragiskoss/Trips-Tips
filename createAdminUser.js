require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Update the path according to your project structure

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Check if the admin user already exists
    const userExists = await User.findOne({ username: "admin" });
    if (userExists) {
      console.log("Admin user already exists.");
      await mongoose.disconnect();
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin", salt);

    // Create a new admin user
    const adminUser = new User({
      username: "admin",
      password: hashedPassword,
    });

    await adminUser.save();
    console.log("Admin user created successfully.");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error creating admin user:", error);
    await mongoose.disconnect();
  }
}

createAdminUser();
