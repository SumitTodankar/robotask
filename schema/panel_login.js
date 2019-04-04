const mongoose                      = require('mongoose');
const Schema                        = mongoose.Schema;
const bcrypt 						= require('bcrypt-nodejs');
const timestamp                     = require('mongoose-timestamp');

const PanelSchema                   = new Schema ({

    userName : {
        type : String
    },

    mobile : {
        type : String
    },

    email : {
        type : String
    },

    password : {
        type : String
    },

    location : { 
        type : String
    },

    role : {
        type : Schema.Types.ObjectId,
        ref : 'roles'
    },

    client_id : {
        type : Schema.Types.ObjectId,
        ref : 'brand'
    }

})

PanelSchema.plugin( timestamp,{ createdAt: 'created_at', updatedAt:'updated_at' });

PanelSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, null, null);  
};

PanelSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('PanelLogin',PanelSchema);