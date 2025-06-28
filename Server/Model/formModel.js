import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    userId: {
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
    edition: {
      type: String,
      default: "1st",
    },
    isbn: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(\d{10}|\d{13})$/.test(v) || v === "";
        },
        message: "Enter a valid ISBN number",
      },
      default: "",
    },
    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one image is required",
      },
    },

    sellerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    whatsapp: {
      type: Number,
      required: true,
    },
    isOrdered: {
      type: Boolean,
      default: false,
    },
    created: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const formModel = mongoose.model("BookForm", bookSchema);
