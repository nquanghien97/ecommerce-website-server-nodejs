import WishList from "../models/wishList.js";

export async function addWishList(req, res) {
  const { userId, productId } = req.body
  
  try {
    let wishList = await WishList.findOne({ userId });
    if(wishList) {
      // wishList exist for user
      let itemIndex = wishList.wishLists.findIndex(p => p.productId == productId);

      if(itemIndex > -1) {
        // product exists for wishlists
        const newWishList = wishList.wishLists.filter(item => {
          return item.productId.toString().replace(/"/g, "") !== productId
        });
         
        wishList.wishLists = newWishList
        wishList = wishList.save();
        return res.status(200).json({
          success: true,
          message: 'wishlist exist, remove wishlist successfully',
          wishlists: newWishList,
        });
      } else {
        wishList.wishLists.push({productId})
        const newWishList = await wishList.save()
        return res.status(200).json({
          success: true,
          message: 'add wishlist successfully',
          wishlists: newWishList,
        });
      }
    } else {
      //no wishList for user, create new wishlist
      const newWishList = await WishList.create({
        userId,
        wishLists: [{productId}],
      })
  
    return res.status(200).json({
      success: true,
      message: 'add wishlist successfully',
      wishlists: newWishList,
    });
    }
    
    
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
}

export async function getWishList(req, res) {
  const { userId } = req.body; 
  // const userId = req.userId;
  try {
    const wishList = await WishList.findOne({userId}).populate({path: "wishLists.productId", model: "product"});
    return res.status(200).json({
      success: true,
      message: 'list of WishList',
      data: wishList,
    });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

// export async function updateCart(req, res) {
//   const {userId, products} = req.body; 

//   try {
//     const cart = await Cart.findOne({userId})
//     for (let i = 0; i < cart.products.length; i++) {
//       const product = products.find(p => p.productId === cart.products[i].productId.toString().replace(/"/g, ""));
//       if (product) {
//         cart.products[i].quantity = product.quantity;
//         cart.products[i].total = cart.products[i].quantity * cart.products[i].price;
//         cart.subTotal = cart.products.reduce((sum, product) => sum + product.total, 0);
//       }
//     }
        
//     const newCart = await Cart.findOneAndUpdate(userId, cart, { new: true });
//     return res.status(200).json({
//       success: true,
//       message: 'list of Cart',
//       data: newCart,
//     });
//   } catch (err) {
//     res.status(500).send("Something went wrong");
//   }
// }

// export async function deleteCart(req, res) {
//   const { userId, productId } = req.body;

//   try{
//     let cart = await Cart.findOne({ userId })
//     const remainCart = cart.products.filter(item => {
//       return item.productId.toString().replace(/"/g, "") !==productId
//     });
//     cart.products = remainCart;
//     cart.subTotal = cart.products.reduce((sum, product) => sum + product.total, 0);
//     cart = await cart.save()
  
//     return res.status(200).json({
//       success: true,
//       message: 'list of Cart',
//       data: cart,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error. Please try again.',
//       error: err.message,
//     });
//   }

// }
