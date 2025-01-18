import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    text: {
      type: String,
      required: [true, "Comment text is required."],
      minlength: [3, "Comment must be at least 3 characters long."],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { _id: true } // Generate unique IDs for comments
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId], // Array of user IDs
      ref: "User",
      default: [],
    },
    comments: [commentSchema], // Embed comments schema
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);



// =======================================================
// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     image: { type: String },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Blog", blogSchema);


