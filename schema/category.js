const mongoose 						= require('mongoose');
const Schema 						= mongoose.Schema;
const timestamps 					= require('mongoose-timestamp');

const CategorySchema 				= new Schema ({

	category_name : {
		type : String
	}

})

CategorySchema.plugin(timestamps, { createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = mongoose.model('category', CategorySchema);