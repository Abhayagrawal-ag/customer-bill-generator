import Sale from "../models/sale.models.js";
import User from "../models/user.models.js";
import Product from "../models/product.models.js";
import Shop from "../models/shop.models.js";
import Customer from "../models/customer.models.js";

const productSale = async (request, response) => {
  try {
    const { userId, products, totalAmount, soldOn, shopId, customerId } =
      request.body;
    if (!soldOn) {
      return response.status(400).json({ message: "Date is required" });
    }

    if (totalAmount < 1) {
      return response
        .status(400)
        .json({ message: "total amount must atleast greater than 1" });
    }
    const userExists = await User.findById(userId);

    if (!userExists) {
      return response.status(400).json({ message: "user not found" });
    }
    const shopExists = await Shop.findById(shopId);

    if (!shopExists) {
      return response.status(400).json({ message: "shop not found" });
    }
    const customerExists = await Customer.findById(customerId);
    if (!customerExists) {
      return response.status(400).json({ message: "customer not found" });
    }

    if (!products || products.length == 0) {
      return response.status(400).json({
        message: "please add atleast one product name and it's quantity",
      });
    }
    for (const item of products) {
      if (!item.product || !item.quantity || !item.amount) {
        return response.status(400).json({
          message: "product, quantity and amount are required for all items",
        });
      }
      const productExists = await Product.findById(item.product);
      if (!productExists) {
        return response.status(400).json({ message: "product not found" });
      }
    }
    const newSale = new Sale({
      user: userId,
      shop: shopId,
      customer: customerId,
      totalAmount,
      soldOn: new Date(soldOn),
      products,
    });
    await newSale.save();
    return response
      .status(200)
      .json({ message: "Bill is sucessfully generated" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};
export default productSale;
