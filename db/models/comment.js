const mongoose  = require('../mongoose')
Schema = mongoose.Schema

const CommentSchema = new Schema({
    commentId: {type:String},
    photoId:{type:String},
    authorId:{type:String},
    authorName:{type:String},
    content:{type:String},
    timestamp:{type:String}
})

module.exports = mongoose.model('Comment', CommentSchema)