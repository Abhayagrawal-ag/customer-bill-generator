import mongoose from "mongoose";
const shopSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  shopAddress: {
    type: String,
    required: true
  },
  shopPhoneNumber : {
    type: String,
    required: true
  },
  openingTime :{
    type: String,
    required: true
  },
  closingTime : {
    type: String,
    required: true
  },
  GST_number:{
    type: String,
    required: true
  }
},{timestamps: true})
const Shop = mongoose.model("Shop", shopSchema)
export default Shop;