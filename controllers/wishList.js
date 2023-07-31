import WishList from "../models/wishList.js";

export async function addWishList(req, res) {
  const { productId } = req.body;

  const userId = req.userId || '';
  
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
  const userId = req.userId;
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

