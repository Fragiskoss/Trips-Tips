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

const destinationContentSchema = new mongoose.Schema({
  id: Number,
  title: String,
  content: String,
  // Add other fields as needed
});

destinationContentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const seq = await getNextSequence("destinationContent");
    this.id = seq;
    next();
  } else {
    next(); // If not new, proceed without modifying id
  }
});

const DestinationContent = mongoose.model("destinationContent", destinationContentSchema);

async function getNextSequence(name) {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

module.exports = DestinationContent;
