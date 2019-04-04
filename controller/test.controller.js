var Brand = require('../schema/brand')
var Category = require('../schema/category')
var Colgate = require('../schema/colgate')
var feedback_answers = require('../schema/feedback_answers')
var feedback_questions = require('../schema/feedback_questions')
var Product = require('../schema/product')
var Panellogin = require('../schema/panel_login')
var orderModel = require('../schema/order')
var feedback_answers = require('../schema/feedback_answers')
var feedback_questions = require('../schema/feedback_questions')
var User = require('../schema/user')

module.exports.getBrand = (req,res)=>{
    // res.json({message:"ok"})

    try {
        Product.find({}).populate('brand').exec(function(err,product){
            
            if(err){console.log(err);}
            console.log("The brand details are %s",product.length)
            res.json(product)
        })
        
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports.getCategory = (req,res)=>{
    // res.json({message:"ok"})

    try {
        Product.aggregate([
            {$group:{_id:"$category_name",product:{$push:"$$ROOT"}}}
        ]).then(result=>{
            res.json({result:result})
            }
        )
        .catch(err=>{
            console.log(err)
        })
    } 

    catch (error) {
        console.log(error)
    }
}

module.exports.getAllCategory = async (req,res)=>{
    var productList = await Product.aggregate([
        {
            $project:{
                product_id:1,
                product_name:1,
                product_url:1,
                category_id:1,
                category_name:1,
                sub_category_id:1,
                sub_category_name:1,
                campaign:1
            }
            
        },
        {$limit:10}
        
    ])
 
    return res.json({productList:productList})
}


module.exports.getColgate = (req,res)=>{
 
    Colgate.findOne({userMobNo:"9881551097"}).populate('verifiedBy').exec((err,colgate)=>{

        if(err){console.log(err);}

        console.log(colgate)
        res.json({result:colgate})
    })
}


module.exports.answer = (req,res)=>{

    feedback_answers.find({question_id:"5afd527716b2454ec9c0c051"})
    .populate({
        path:'user_id',
        select:'user_id name email mobile answer'
    })
    .exec(function(err,answer){
        if(err) {console.log(err);}
                                                                                                                
        // console.log(answer);
        res.json({result:answer})

    })

}

module.exports.getEmbeddedOrders = (req,res)=>{

    orderModel.aggregate([
        // {$unwind:"$product_id"},
        {
            $lookup:
            {
                from:'products',
                localField: 'product_id',
                foreignField: '_id',
                as: 'myobject'
            }
        },
        {
            $limit : 10
        },
        {
            $project : {
                product : { $arrayElemAt : [ "$myobject", 0] },
                order_id : 1
            }
        },  
        {
            $project : {
                "product.sub_category_name" : 1
            }
        }
        // {

        //     $group : {
        //         _id : "$product._id",
        //         order : { $push : "$$ROOT" },

        //     count : { $sum : 1 }
        //     }
        // }
        // {
        //     $match: { "myobject": { $ne: [] } }
        // }
    ]).then(doc=>{
        res.json({order:doc})
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports.date = (req,res)=>{
    var startDate = new Date("2018-11-01");
    var endDate = new Date("2018-11-22");

    orderModel.find({
        'created_at': { $lte: endDate,
                $gte: startDate }
    }).then(rec=>{
        res.json({rec:rec})
    }).catch(err=>{
        console.log(err)
    })
}

module.exports.andUser = (req,res)=>{
    User.find({$and:[
        {"email_status":"verified"},
        {"mobile_status":"verified"}
    ]
    }).then(rec=>{
        res.json({rec:rec})
    }).catch(err=>{
        console.log(err)
    })
}

module.exports.orUser = (req,res)=>{
    User.find({$and:[
        {"email_status":"verified"},
        {"mobile_status":"verified"}
    ]
    }).then(rec=>{
        res.json({rec:rec})
    }).catch(err=>{
        console.log(err)
    })
}


module.exports.norData = (req,res)=>{
    User.find({$nor:[
        {"email_status":"verified"},
        {"mobile_status":"verified"}
    ]
    }).then(rec=>{
        res.json({rec:rec})
    }).catch(err=>{
        console.log(err)
    })
}


module.exports.notData = (req,res)=>{
    Product.find({
       quantity:{$not:{$gt:2}} 
    })
    .then(rec=>{
        res.json({rec:rec})
    }).catch(err=>{
        console.log(err)
    })

}