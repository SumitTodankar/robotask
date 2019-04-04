const mongoose 						= require('mongoose');
const Schema 						= mongoose.Schema;
const timestamps 					= require('mongoose-timestamp');
// const FeedbackAnswer				= require('./feedback_answers');
const mongoose_delete 				= require('mongoose-delete');

const FeedbackQuestionSchema 		= new Schema ({

	campaign_id : {
		type : Schema.Types.ObjectId,
		ref : 'campaign'
	},

	product_id : {
		type : Schema.Types.ObjectId,
		ref : 'product'
	},

	question : {
		type : String
	},
	
	answerType : {
		type : String,
		enum : ['float','int','dateTime','boolean','singleSelect','multiSelect','String','text']
	},

	subType : {
		type : String,
		enum : ['input','rating']
	},

	options : {
		type : Array
	},

	answers : [{
		type : Schema.Types.ObjectId,
		ref : 'feedback_answer'
	}],

	deleted : {
		type : Boolean,
		default : false
	},

	disabled : {
		type : Boolean
	}
})

FeedbackQuestionSchema.plugin(mongoose_delete);

FeedbackQuestionSchema.plugin(timestamps, { createdAt: 'created_at', updatedAt: 'updated_at' });

// FeedbackQuestionSchema.post('save', async (ques) => {
// 	// console.log(ques.campaign_id);
// 	console.log(ques._id);
// 	await Campaign.findOneAndUpdate({_id:ques.campaign_id},{$push:{feedback_questions:ques._id}}).exec(function(err,data){
// 		if(err) console.log(err);
// 		console.log(data);
// 	});
// })

module.exports = mongoose.model('feedback_question', FeedbackQuestionSchema);