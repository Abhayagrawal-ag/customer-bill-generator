import mongoose from "mongoose";
const customerSchema = new mongoose.Schema(
  {
    shopKeeper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },
    customerName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: true
    }
  },
  { timestamps: true },
);
const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
