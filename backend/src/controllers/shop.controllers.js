import Shop from "../models/shop.models.js";
import User from "../models/user.models.js";

export const shopDetails = async (req, res) => {
  try {
    const {
      shopName,
      shopAddress,
      openingTime,
      closingTime,
      shopPhoneNumber,
      GST_number,
    } = req.body;
    if (
      !shopName ||
      !shopAddress ||
      !openingTime ||
      !closingTime ||
      !shopPhoneNumber ||
      !GST_number
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const owner = req.user.id;
    const user = await User.findById(owner);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const shopExists = await Shop.findOne({ shopName });
    if (shopExists) {
      return res.status(400).json({ message: "shop is already exists" });
    }
    if (!/^91\d{10}$/.test(shopPhoneNumber)) {
      return res.status(400).json({
        message: "phone number must start with 91 and have 10 digits",
      });
    }

    const newShop = new Shop({
      owner: req.user.id,
      shopName,
      shopPhoneNumber,
      shopAddress,
      openingTime,
      closingTime,
      GST_number,
    });
    const savedShop = await newShop.save();
    res
      .status(200)
      .json({ message: "shop is successfully added", shop: savedShop });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error, try again" });
  }
};

export const getAllShopIds = async (req, res) => {
  try {
    const userId = req.user.id;
    const shops = await Shop.find({ owner: userId })
    if (!shops.length) {
      return res.status(400).json({ message: "shops not found" });
    }
    res.status(200).json(shops);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error while fetching shops" });
  }
};
