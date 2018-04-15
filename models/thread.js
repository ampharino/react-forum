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
    }
},
    {timestamps:{createdAt:'created'}}

)

module.exports = mongoose.model('Thread', ThreadSchema);