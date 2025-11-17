import Product from "../models/product.models.js";
import Shop from "../models/shop.models.js";

const manageProduct = async (request, response) => {
  try {
    const { shopId , productName, productPrice } = request.body;

    if (!productName || !productPrice) {
      return response
        .status(400)
        .json({ message: "please enter all the fields" });
    }
    if (productPrice < 1) {
      return response
        .status(400)
        .json({ message: "product price must atleast greater than 1" });
    }
   
    const shopExists = await Shop.findById(shopId);
    if (!shopExists) {
      return response.status(400).json({ message: "shop doesn't exists" });
    }

    const newProduct = new Product({
      shop: shopId,
      productName,
      productPrice,
    });
    const productSaved = await newProduct.save();
    return response
      .status(200)
      .json({ message: "products is successfully added in the bill" , productData: productSaved });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};
export default manageProduct;
