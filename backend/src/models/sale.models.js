import mongoose from "mongoose";
const saleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        amount : {
          type: Number,
          required: true,
          min: 1
        },
        _id: false
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min:1
    },
    soldOn: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);
const Sale = mongoose.model("Sale", saleSchema);
export default Sale;
