const mongoose 						= require('mongoose');
const Schema 						= mongoose.Schema;
const timestamps 					= require('mongoose-timestamp');
const FeedbackQuestion 				= require('./feedback_questions');

const FeedbackAnswerSchema 			= new Schema({

	user_name : {
		type : String
	},

	user_id : {
		type : Schema.Types.ObjectId,
		ref : 'user'
	},

	templateId : {
		type : Number
	},

	campaign_id : {
		type : Schema.Types.ObjectId,
		ref : 'campaign'
	},

	product_id : {
		type : Schema.Types.ObjectId,
		ref : 'product'
	},
		
	question_id : {
		type : Schema.Types.ObjectId,
		ref : 'QuestionTemplate'
	},

	answer : { 
		type : Array 
	},
})


FeedbackAnswerSchema.plugin(timestamps, { createdAt: 'created_at', updatedAt: 'updated_at' });

// FeedbackAnswerSchema.post('save', async (ans) => {
// 	await FeedbackQuestion.findOneAndUpdate({_id:ans.question_id},{$push:{answers:ans._id}})
// })

module.exports = mongoose.model('feedback_answer', FeedbackAnswerSchema);