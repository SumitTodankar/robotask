// var Order = require('../schema/order.schema')
// var Users = require('../schema/user.schema')


module.exports.getAllUserAndOrder = async (req,res) =>{
    // res.json({message:"All Set To Go"});
    var users = await Users.find().count()
    //   .then(doc => {
    //     res.json({total:doc})
    //   })
    //   .catch(err => 
    //     console.error(err)
    //   })

      var orders = await Order.find().count()
    //   .then(doc => {
    //     res.json({total:doc})
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    return res.json({users:users,orders:orders})
}




module.exports.getOrderPerUser = async (req,res) =>{
    // res.json({message:"All Set To Order"});
    var maxorder = await Users.aggregate([
      {
         $project: {
            _id: 1,
            userId:1,
            name:1,
            mobile:1,
            email:1,
            password:1,
            email_status:'verified',
            mobile_status:'verified',
            numberOfOrders: { $cond: { if: { $isArray: "$order_details" }, then: { $size: "$order_details" }, else: "NA"} }
         }
      },
      {$sort :{numberOfOrders:-1}}
    ] )   
    .then(doc => {
        res.json({maxorders:doc})
      })
    .catch(err => {
        console.error(err)
    })
    return res.send({maxorder:maxorder})
}


module.exports.tryPopulate = (req,res)=> {

    Users.findOne({mobile:'9821355877'}).populate('order_details').exec(function (err, users) {
      if (err) {console.log(err);}

      console.log('The user is %s', users.order_details);
      res.json({'The order details are ': users.order_details}) 
    });  
}

module.exports.tryPaginate = (req,res)=>{
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var query= {};

    if(pageNo<0 || pageNo===0){
      response = {error:"Invalid Page Number. Page not valid"}
    }
    
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
       Users.countDocuments({},function(err,totalCount) {
             if(err) {
               response = {"error" : true,"message" : "Error fetching data"}
             }
         Users.find({},{},query,function(err,data) {
              // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                var totalPages = Math.ceil(totalCount / size)
                response = {"error" : false,"message" : data,"pages": totalPages};
            }
            res.json(response);
         });
       })
    

}