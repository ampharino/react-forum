const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
        versionKey:false,
        body:{
            type:String,
            required:true
        },

        author:{
            type:String,
            required:true,
            lowercase:true
        },

        thread:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        karma:{
            type:Number,
            default:0
        },
        upvoted:{
            type:[String],
            default:[]
        },
        downvoted:{
            type:[String],
            default:[]
        }
    },
    {timestamps:{createdAt:'created'}}

)

module.exports = mongoose.model('Comment', CommentSchema);