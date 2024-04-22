const mongoose = require("mongoose");

// Counter model check
const Counter =
  mongoose.models.Counter ||
  mongoose.model(
    "Counter",
    new mongoose.Schema({
      _id: String,
      seq: { type: Number, default: 0 },
    })
  );

const destinationsPostSchema = new mongoose.Schema({
  id: Number,
  title: String,
  content: String,
  category: String,
  imageUrl: String,
  // Add other fields as needed
});

destinationsPostSchema.pre("save", async function (next) {
  if (this.isNew) {
    const seq = await getNextSequence("DestinationsPost");
    this.id = seq;
    next();
  } else {
    next(); // If not new, proceed without modifying id
  }
});

const DestinationsPost = mongoose.model(
  "DestinationsPost",
  destinationsPostSchema
);

async function getNextSequence(name) {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

module.exports = DestinationsPost;
