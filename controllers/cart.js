import Cart from "../models/cart.js";

export async function addCart(req, res) {
  const { productId, quantity, price, userId } = req.body
  
  let total = 0

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p => p.productId == productId);
      // let cart.subTotal = 0

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
        productItem.total = productItem.quantity * productItem.price;
        cart.subTotal = cart.products.reduce((acc, cur) => acc + cur.total, 0)
      } else {
        // product does not exists in cart, add new item
        total = quantity * price;
        cart.products.push({ productId, quantity, price, total });
        cart.subTotal = cart.products.reduce((acc, cur) => acc + cur.total, 0)
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      total = quantity * price;
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity, price, total }],
        subTotal: total,
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
}
