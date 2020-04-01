const mongoose  = require('../mongoose')
Schema = mongoose.Schema

const PhotoSchema = new Schema({
    pid: {type:String,unique:true,dropDups: true},
    caption: {type:String}
})

module.exports = mongoose.model('Photo', PhotoSchema)