const mongoose 						= require('mongoose');
const Schema 						= mongoose.Schema;
const timestamps 					= require('mongoose-timestamp');
const User 							= require('./user');

const OrderSchema 					= new Schema ({

	product_id : {
		type : Schema.Types.ObjectId,
		ref : 'product'
	},

	product_name : {
		type : String
	},

	brand_id : {
		type : Schema.Types.ObjectId,
		ref : 'brand'
	},

	campaign_id : {
		type : Schema.Types.ObjectId,
		ref : 'campaign'
	},

	customer_details : {
		type : Schema.Types.ObjectId,
		ref : 'user'
		},

	status : {
		type : String,
		enum : ['new','shipped','delayed','delivered','cancelled'],
		default : 'new'
	},

	feedback_status : {
		type : Boolean,
		default : false
	},

	order_id : {
		type : Number
	}

})

OrderSchema.plugin(timestamps, { createdAt: 'created_at', updatedAt: 'updated_at' });

OrderSchema.post('save', async (data)=>{
	await User.findOneAndUpdate({_id:data.customer_details},{$push:{order_details:data._id}});
})

module.exports = mongoose.model('order', OrderSchema);