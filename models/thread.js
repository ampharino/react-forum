const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    versionKey:false,
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String
    },
    author:{
        type:String,
        required:true,
        lowercase:true
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

module.exports = mongoose.model('Thread', ThreadSchema);