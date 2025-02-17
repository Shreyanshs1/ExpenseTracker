const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        expenses:[
            {
                text:{
                    type:String,
                    required:true
                },
                amount:{
                    type:Number,
                    required:true
                },
                createdAt:{
                    type:Date,
                    default:Date.now
                }
            }
        ]
    },{
        timestamps: true
    }
);

module.exports = mongoose.model('dbusers', userSchema);