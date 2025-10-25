import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Novel",
        "Science",
        "Biography",
        "Fantasy",
        "History",
        "Mystery",
        "Romance",
        "Thriller",
        "Self-Help",
        "Philosophy",
        "Poetry",
        "Travel",
        "Health",
        "Business",
        "Technology",
        "Religion",
        "Art",
        "Children",
        "Young Adult",
        "Classic",
        "Comics",
        "Other"
    ],
    default: "Other",
    },
    image: {
      public_id: { type: String, required: false },
      url: { type: String, required: false }
    },
    readingStatus: {
      type: String,
      enum: ["to-read", "reading", "completed"],
      default: "to-read",
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now, 
    },
    readDate: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    review: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt otomatik eklenir
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;