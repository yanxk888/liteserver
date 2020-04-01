const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const lowdb = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const dateFormat = require('dateformat')

const adapter = new fileSync('db.json')
const db = lowdb(adapter)

const PhotoModel = require('./db/models/photo')

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.use((req, res, next)=>{
    if(req.method === 'POST'){
        req.body.updatedAt = dateFormat(Date.now(),'yyyy-mm-dd')
    }
    next()
})

server.post('/api/sendphotos',(req, res)=>{
    const photos = []
    req.body.data.privateFeeds.list.forEach((item)=>{
        photos.push({
            pid:item.id,
            caption:item.caption
        })
    })

    PhotoModel.insertMany(photos,(err,result)=>{
        if (err) {
            res.jsonp({success:false, message:err.message})
        } else {
            res.jsonp({success:true,message:result.length + 'photos were successfully stored.'})
        }
    })
})

server.use(router)
server.listen(5050, ()=>{
    console.log('json server is running with port 5050')
})
