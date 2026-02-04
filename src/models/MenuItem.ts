import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    image: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    discountedPrice: {
      type: Number,
    },

    category: {
      type: String,
      enum: ["Starters", "Main Course", "Desserts", "Beverages"],
      required: true,
      index: true,
    },

    subCategory: {
      type: String,
      enum: ["Veg", "Non-Veg", "Soups", "Snacks", "Rice", "Bread"],
      index: true,
    },

    isVeg: {
      type: Boolean,
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
      index: true,
    },

    isChefSpecial: {
      type: Boolean,
      default: false,
      index: true,
    },

    description: {
      type: String,
    },

    ingredients: [
      {
        type: String,
      },
    ],

    nutrition: {
      calories: String,
      protein: String,
      carbs: String,
      fat: String,
    },

    preparationTime: {
      type: Number, // minutes
    },

    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.MenuItem ||
  mongoose.model("MenuItem", MenuItemSchema);
