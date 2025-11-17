import Customer from "../models/customer.models.js";
import User from "../models/user.models.js";
import Shop from "../models/shop.models.js";

export const customerDetails = async (req, res) => {
  try {
    const {
      userId,
      shopId,
      customerName,
      address,
      mobileNumber,
      whatsappNumber,
    } = req.body;
    if (!customerName || !address || !mobileNumber || !whatsappNumber) {
      return res
        .status(400)
        .json({ message: "please fill the all the fields" });
    }
    const shopKeeperExists = await User.findById(userId);
    if (!shopKeeperExists) {
      return res.status(400).json({ message: "shopKeeper doesn't exits" });
    }
    const shopExists = await Shop.findById(shopId);
    if (!shopExists) {
      return res.status(400).json({ message: "shop doesn't exits" });
    }
    if (!/^91\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({
        message: "phone number must start with 91 and have 10 digits",
      });
    }
    if (!/^91\d{10}$/.test(whatsappNumber)) {
      return res.status(400).json({
        message: "whatsapp number must start with 91 and have 10 digits",
      });
    }
    const newCustomer = new Customer({
      shopKeeper: userId,
      shop: shopId,
      customerName,
      address,
      mobileNumber,
      whatsappNumber,
    });
    const customerSaved = await newCustomer.save();
    return res
      .status(200)
      .json({
        message: "customer details are successfully added",
        customerData: customerSaved,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error please try again later" });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
  
    const userId = req.user.id;
    const {shopId} = req.params;

    const shop = await Shop.findOne({_id: shopId, owner: userId})
    if(!shop){
      return res.status(400).json({message: "Unauthorised and invalid shop"})
    }
    
    const customers = await Customer.find({ shop: shopId });
    if ( !customers || customers.length === 0) {
      return res.status(400).json({ message: "no customers are found for this shop" });
    }
    return res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "failed to fetch the customers"})
  }
};
