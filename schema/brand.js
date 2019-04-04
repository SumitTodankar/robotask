const mongoose 						= require('mongoose');
const Schema 						= mongoose.Schema;
const timestamps 					= require('mongoose-timestamp');
const mongoose_delete 				= require('mongoose-delete');

const BrandSchema 					= new Schema ({

	brand_name : {
		type : String
	},

	brand_description : {
		type : String
	},
	
	brand_managers : [{
		type : Schema.Types.ObjectId
	}],

	assets : [{

		name : String,
		type : String,
		src : String

	}],

	disabled : {
		type : Boolean,
		default : false
	},

	deleted : {
		type : Boolean,
		default : false
	}

})

BrandSchema.plugin(mongoose_delete);

BrandSchema.plugin(timestamps, { createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = mongoose.model('brand', BrandSchema);