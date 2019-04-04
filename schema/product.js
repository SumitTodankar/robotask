const mongoose 						= require('mongoose');
const Schema 						= mongoose.Schema;
const timestamps 					= require('mongoose-timestamp');
const mongoose_delete 				= require('mongoose-delete');

const ProductSchema 				= new Schema ({

	skuCode : {
		type : String
	},

	product_id : {
		type : Number
	},

	product_name : {
		type : String
	},

	product_url : {
		type : String
	},

	brand : {
		type : Schema.Types.ObjectId, 
		ref : 'brand'
	},

	category_id : {
		type : Schema.Types.ObjectId, 
		ref : 'category'
	},

	category_name : {
		type : String
	},

	sub_category_id : {
		type : Schema.Types.ObjectId, 
		ref : 'sub_category'
	},

	sub_category_name : {
		type : String
	},

	feedback : [{
		type : Schema.Types.ObjectId,
		ref : 'feedback'
	}],

	campaign : {
		type : Schema.Types.ObjectId,
		ref : 'campaign'
	},

	description : {
		type : String
	},

	why_try_des : {
		type : Array
	},

	ingredients : {
		type : String
	},

	wishlist : {
		type : Number
	},

	quantity : {
		type : Number
	},

	product_blurb : {
		type : String
	},

	sq_description : {
		type : String
	},

	product_highlight : {
		type : String
	},

	did_you_know : {
		description : String,
		image : String
	},

	images : {
		type : Array
	},

	video_link : [{
        link : String,
        title : String
    }],

	testimonial : [{
		response : String,
		name : String	
	}],

	priority : {
		type : Number
	},

	delivery_type : {
		type : String
	},

	product_link : {
		type : String
	},

	contact_no : {
		type : Array
	},

	disabled : {
		type : Boolean,
		default : false
	},

	buyNowLink: {
		type : String,
	},

	buyNowLabel : {
		type : String
	}

})

ProductSchema.plugin(mongoose_delete);

ProductSchema.plugin(timestamps, { createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = mongoose.model('product', ProductSchema);