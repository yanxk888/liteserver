var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/kuaishou')

mongoose.connection.on('connected', function () { 
    console.log('Mongoose connection opened')
})
    
mongoose.connection.on('error',function (err) { 
    console.log('Mongoose connection error: ' + err)
})
    
mongoose.connection.on('disconnected', function () { 
    console.log('Mongoose connection disconnected')
})

module.exports = mongoose