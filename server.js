require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const BlogPost = require("./models/BlogPost");
const DestinationsPost = require("./models/DestinationsPost"); 
const TipsPost = require("./models/TipsPost");
const BlogContent = require("./models/BlogContent");
const DestinationContent = require("./models/DestinationContent");
const TipContent = require("./models/TipContent");


const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const newPost = new BlogPost(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating a new post" });
  }
});


// Update a post
app.put("/api/posts/:id", async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating the post" });
  }
});


// Delete a post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the post" });
  }
});











app.get("/api/blogs", async (req, res) => {
  try {
    const Content = await BlogContent.find();
    res.json(Content);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  try {
    // Assuming `id` is a number. Adjust if it's a string.
    const id = parseInt(req.params.id);
    const blogPost = await BlogContent.findOne({ id });
    if (!blogPost) {
      return res.status(404).send({ message: "Blog post not found" });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(500).send({ message: "Error fetching blog post", error });
  }
});




app.post("/api/blogs", async (req, res) => {
  try {
    const newContent = new BlogContent(req.body);
    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ message: "Error creating a new post" });
  }
});


// Update a post
app.put("/api/blogs/:id", async (req, res) => {
  try {
    const updatedContent = await BlogContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: "Error updating the post" });
  }
});

// Corrected Delete Route for BlogContent
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    await BlogContent.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the blog post" });
  }
});










//Destinations//

app.get("/api/destination", async (req, res) => {
  try {
    const posts = await DestinationsPost.find();
    res.json(posts);
  } catch (error) {
    console.error("Fetch destinations posts error:", error);
    res.status(500).json({ message: "Error fetching destinations posts" });
  }
});

app.post("/api/destination", async (req, res) => {
  try {
    const newPost = new DestinationsPost(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Create destinations post error:", error);
    res.status(500).json({ message: "Error creating a new destinations post" });
  }
});

app.put("/api/destination/:id", async (req, res) => {
  try {
    const updatedPost = await DestinationsPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    console.error("Update destinations post error:", error);
    res.status(500).json({ message: "Error updating the destinations post" });
  }
});

app.delete("/api/destination/:id", async (req, res) => {
  try {
    await DestinationsPost.findByIdAndDelete(req.params.id);
    res.json({ message: "Destinations post deleted successfully" });
  } catch (error) {
    console.error("Delete destinations post error:", error);
    res.status(500).json({ message: "Error deleting the destinations post" });
  }
});






app.get("/api/desti", async (req, res) => {
  try {
    const Content = await DestinationContent.find();
    res.json(Content);
  } catch (error) {
    res.status(500).json({ message: "Error fetching destination" });
  }
});

app.get("/api/desti/:id", async (req, res) => {
  try {
    // Assuming `id` is a number. Adjust if it's a string.
    const id = parseInt(req.params.id);
    const destinationPost = await DestinationContent.findOne({ id });
    if (!destinationPost) {
      return res.status(404).send({ message: "Destination post not found" });
    }
    res.json(destinationPost);
  } catch (error) {
    res.status(500).send({ message: "Error fetching destination post", error });
  }
});

app.post("/api/desti", async (req, res) => {
  try {
    const newContent = new DestinationContent(req.body);
    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ message: "Error creating a new post" });
  }
});

// Update a post
app.put("/api/desti/:id", async (req, res) => {
  try {
    const updatedContent = await DestinationContent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: "Error updating the post" });
  }
});


// Corrected Delete Route for BlogContent
app.delete("/api/desti/:id", async (req, res) => {
  try {
    await DestinationContent.findByIdAndDelete(req.params.id);
    res.json({ message: "Destination post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the destination post" });
  }
});














//Tips//


app.get("/api/tip", async (req, res) => {
  try {
    const posts = await TipsPost.find();
    res.json(posts);
  } catch (error) {
    console.error("Fetch tips posts error:", error);
    res.status(500).json({ message: "Error fetching tips posts" });
  }
});

app.post("/api/tip", async (req, res) => {
  try {
    const newPost = new TipsPost(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Create tips post error:", error);
    res.status(500).json({ message: "Error creating a new tips post" });
  }
});

app.put("/api/tip/:id", async (req, res) => {
  try {
    const updatedPost = await TipsPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    console.error("Update tips post error:", error);
    res.status(500).json({ message: "Error updating the tip post" });
  }
});

app.delete("/api/tip/:id", async (req, res) => {
  try {
    await TipsPost.findByIdAndDelete(req.params.id);
    res.json({ message: "Tips post deleted successfully" });
  } catch (error) {
    console.error("Delete tips post error:", error);
    res.status(500).json({ message: "Error deleting the tips post" });
  }
});






app.get("/api/ti", async (req, res) => {
  try {
    const Content = await TipContent.find();
    res.json(Content);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tips" });
  }
});

app.get("/api/ti/:id", async (req, res) => {
  try {
    // Assuming `id` is a number. Adjust if it's a string.
    const id = parseInt(req.params.id);
    const tipPost = await TipContent.findOne({ id });
    if (!tipPost) {
      return res.status(404).send({ message: "Tip post not found" });
    }
    res.json(tipPost);
  } catch (error) {
    res.status(500).send({ message: "Error fetching tip post", error });
  }
});

app.post("/api/ti", async (req, res) => {
  try {
    const newContent = new TipContent(req.body);
    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ message: "Error creating a new post" });
  }
});

// Update a post
app.put("/api/ti/:id", async (req, res) => {
  try {
    const updatedContent = await TipContent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: "Error updating the tip" });
  }
});

// Corrected Delete Route for BlogContent
app.delete("/api/ti/:id", async (req, res) => {
  try {
    await TipContent.findByIdAndDelete(req.params.id);
    res.json({ message: "Tip post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the tip post" });
  }
});














// User Login Route (Example)
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    // Directly compare the plaintext password from the request with the one stored in the database
    if (password !== user.password) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    res.send({ message: "User logged in successfully" });
    // Implement JWT or session for maintaining user state here
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error logging in" });
  }
});

// MailerLite newsletter signup
app.post("/newsletter-signup", async (req, res) => {
  const { email } = req.body;
  const data = { email };

  try {
    const response = await axios.post(
      `https://api.mailerlite.com/api/v2/subscribers`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      res.send({ message: "Successfully subscribed to newsletter!" });
    } else {
      res.send({
        message: "Subscription processed with unexpected status code.",
      });
    }
  } catch (error) {
    console.error(
      "MailerLite error:",
      error.response ? error.response.data : error
    );
    res.status(500).send({ message: "Error subscribing to newsletter" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
