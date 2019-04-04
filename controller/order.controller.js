// var Order = require('../schema/order.schema')
// var Users = require('../schema/user.schema')


module.exports.getOrderDelivered= async (req,res)=>{
   var orders = await Order.aggregate([
       {$match:{status:'delivered'}},
       {$group:{_id:{feedback_status:true}}}
   ])

   return res.json({orders:orders})
}

module.exports.getOrderDelayed= async (req,res)=>{
    var orders = await Order.aggregate([
        {
            $match:{status:"delayed"}
        },  
        {
            $project:{
                order_id:1,
                product_id:1,
                product_name:1,
                campaign_id:1,
                customer_details:1,
                status:1,
                feedback_status : true
            }
        },
        {
            $sort:{product_name:1}
        },
        {
            $limit:10
        }
    ])
 
    return res.json({orders:orders})
}

module.exports.getOrderCancelled= async (req,res)=>{
    var orders = await Order.aggregate([
        {$match:{status:['cancelled']}},
        {
            $project:{
                order_id:1,
                product_id:1,
                product_name:1,
                campaign_id:1,
                status:['cancelled'],
                feedback_status : true,
                numberOfCancelledOrder: { $cond: { if: { $isArray: "$status" }, then: { status: ["cancelled"] }, else: "NA"} }
            }
        },
        {$sort:{numberOfCancelledOrder:-1}}
    ])
 
    return res.json({orders:orders})
}

