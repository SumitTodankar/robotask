const mongoose 					    = require('mongoose');
const Schema 						= mongoose.Schema;
const bcrypt 						= require('bcrypt-nodejs');
const timestamps                    = require('mongoose-timestamp');

const userSchema                    = new Schema({

    userId : {
        type : Number
    },

    name : {
        type : String
    },

    email: {
    	type: String
    },

    mobile : {
        type : String
    },

    new_mobile : {
        type : String
    },

    address : {

        apt_bldg : String,
        street : String,
        city : String,
        pin_code : Number

    },

    password: {
    	type: String
    },

    otp : {
        type : Number
    },

    mobile_status : {
        type : String,
        enum : ['verified','unverified'],
        default : 'unverified'
    },

    email_status : {
        type : String,
        enum : ['verified','unverified'],
        default : 'unverified'
    },

    order_details : [{
        type : Schema.Types.ObjectId, 
        ref : 'order'
    }],

    wishlist : [{
        type : Schema.Types.ObjectId, 
        ref : 'wishlist' 
    }],

    token : {
        type : String
    },

    block_status : {
        type : Number,
        default : 0
    }

});

userSchema.plugin(timestamps, { createdAt: 'created_at', updatedAt: 'updated_at' }); 

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, null, null);  
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);