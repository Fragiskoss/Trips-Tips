const mongoose = require("mongoose");

// Counter Schema
const counterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model("Counter", counterSchema);

// BlogPost Schema
const blogPostSchema = new mongoose.Schema({
  id: Number,
  title: String,
  content: String,
  category: String,
  imageUrl: String,
  // other fields
});

// Pre-save middleware to set the blog post's ID
blogPostSchema.pre("save", async function (next) {
  if (this.isNew) {
    const seq = await getNextSequence("blogpost");
    this.id = seq;
  }
  next();
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

// Function to get next sequence
async function getNextSequence(name) {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

module.exports = BlogPost;
