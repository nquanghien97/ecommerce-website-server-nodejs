import Cart from "../models/cart.js";

export async function addCart(req, res) {
  const { productId, price, userId } = req.body
  
  let total = 0

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity += 1;
        cart.products[itemIndex] = productItem;
        productItem.total = productItem.quantity * productItem.price;
        cart.subTotal = cart.products.reduce((acc, cur) => acc + cur.total, 0)
      } else {
        // product does not exists in cart, add new item
        total = price;
        cart.products.push({ productId, price, total });
        cart.subTotal = cart.products.reduce((acc, cur) => acc + cur.total, 0)
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      total = price;
      const newCart = await Cart.create({
        userId,
        products: [{ productId, price, total }],
        subTotal: total,
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
}

export async function getCart(req, res) {
  const { userId } = req.body; 
  try {
    const cart = await Cart.findOne({userId: userId}).populate({path: "products.productId", model: "product"});
    return res.status(200).json({
      success: true,
      message: 'list of Cart',
      data: cart,
    });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

export async function updateCart(req, res) {
  const {userId, products} = req.body; 

  try {
    const cart = await Cart.findOne({userId})
    for (let i = 0; i < cart.products.length; i++) {
      const product = products.find(p => p.productId === cart.products[i].productId.toString().replace(/"/g, ""));
      if (product) {
        cart.products[i].quantity = product.quantity;
        cart.products[i].total = cart.products[i].quantity * cart.products[i].price;
        cart.subTotal = cart.products.reduce((sum, product) => sum + product.total, 0);
      }
    }

    const newCart = await Cart.findOneAndUpdate({userId}, cart, { new: true });
    console.log(cart)
    return res.status(200).json({
      success: true,
      message: 'list of Cart',
      data: newCart,
    });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

export async function deleteCart(req, res) {
  const { userId, productId } = req.body;

  try{
    let cart = await Cart.findOne({ userId })
    const remainCart = cart.products.filter(item => {
      return item.productId.toString().replace(/"/g, "") !==productId
    });
    cart.products = remainCart;
    cart.subTotal = cart.products.reduce((sum, product) => sum + product.total, 0);
    cart = await cart.save()
  
    return res.status(200).json({
      success: true,
      message: 'list of Cart',
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }

}
