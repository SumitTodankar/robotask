const mongoose 						= require('mongoose');
const Schema 						= mongoose.Schema;
const timestamps 					= require('mongoose-timestamp');
const autoIncrement 				= require('mongoose-auto-increment');

const colgateUserSchema 		= new Schema ({

    userMobNo : {
        type : String
    },

    virtualMobNo : {
        type : String
    },

    timestamp : {
        type : Date
    },

    otp : {
        type : String
    },

    dataObj : {
        type : Object
    },

    otpStatus : {
        type : Boolean,
        default : false
    },

    verifiedBy : {
        type : Schema.Types.ObjectId,
        ref : 'PanelLogin'
    },
    
    sandbox : {
        type : Boolean,
        default : true
    }

})

colgateUserSchema.plugin(autoIncrement.plugin, { model: 'colgateUsers', field: 'userId', startAt: 1, incrementBy: 1 })

colgateUserSchema.plugin(timestamps, { createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = mongoose.model('colgateUsers', colgateUserSchema);