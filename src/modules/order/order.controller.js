import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../databases/models/user.model.js"
import { Cart } from "../../../databases/models/cart.model.js"
import { Product } from "../../../databases/models/product.model.js"
import { Coupon } from "../../../databases/models/coupon.model.js"
import { Order } from "../../../databases/models/order.model.js"
import { updateOne } from "../handlers/handlers.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51QrMURGraLS0Ad4iAbA7lAjk6NIHsW7qASJFSnWGzdwSAuTPY8Kk2ZDPNSkuu7ooQG71LQhzzKIntHDobYOGv9o200OJUmko7G');



const createCashOrder = catchError(async(req , res , next) => {
  
    let cart = await Cart.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found' , 404))
    let totalOrderPrice = cart.totalCartPrice || cart.totalCartPriceAfterDiscount

    let order = new Order({
        user : req.user._id,
        orderItems : cart.cartItems,
        shippingAddress : req.body.shippingAddress,
        totalOrderPrice : totalOrderPrice
    })

    await order.save()


    let options = cart.cartItems.map((prod) => {
        return ({
            updateOne: {
                "filter" : {_id : prod.product},
                "update" : {$inc : {sold : prod.quantity , stock : -prod.quantity}}
            }
        })
    })

    await Product.bulkWrite(options)

    await Cart.findByIdAndDelete(cart._id)

    res.json({message : "success" , order})

   
})



const getUserOrders = catchError(async(req , res , next) => {

    let orders = await Order.findOne({user : req.user._id}).populate('orderItems.product')
    res.json({message : "success" , orders})

})


const getAllOrders = catchError(async(req , res , next) => {

    let orders = await Order.find({})
    res.json({message : "success" , orders})

})



const createCheckoutSession = catchError(async(req , res , next) => {
    let cart = await Cart.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found' , 404))
    let totalOrderPrice = cart.totalCartPrice || cart.totalCartPriceAfterDiscount

    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
              price_data: {
                currency: 'egp',
                unit_amount : totalOrderPrice * 100,
                product_data : {
                    name : req.user.name
                }
              },
              quantity : 1,
            },
          ],    

          mode : 'payment',
          success_url : "http://localhost:3000/api/products",
          cancel_url : "http://localhost:3000/api/carts",
          customer_email: req.user.email,
          client_reference_id: req.params.id,
          metadata: req.body.shippingAddress,
    })

    res.json({message : "success" , session})
})



export {
    createCashOrder,
    getUserOrders,
    getAllOrders,
    createCheckoutSession
}