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

const CommentModel = require('./db/models/comment')

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.use((req, res, next)=>{
    if(req.method === 'POST'){
        req.body.updatedAt = dateFormat(Date.now(),'yyyy-mm-dd')
    }
    next()
})

server.post('/api/sendphotos',(req, res)=>{
    var errMsg = ''
    var success = false;
    req.body.data.privateFeeds.list.forEach((item)=>{
        var photo = new PhotoModel({
            pid:item.id,
            caption:item.caption
        })
        photo.save((err,result)=>{
            if(err){
                errMsg = err.message
            }else{
                success = true
            }
        })
    })
    if(!success){
        res.jsonp({success:true,message: 'photos were successfully stored.'})
    }else{
        res.jsonp({success:false,message:errMsg})
    }
})

server.post('/api/sendcomments',(req,res)=>{
    var errMsg = ''
    var success = false;
    const photoId = req.body.photoId
    req.body.data.shortVideoCommentList.commentList.forEach((item)=>{
        var comment  = new CommentModel({
            commentId:item.commentId,
            photoId:photoId,
            authorId:item.authorId,
            authorName:item.authorName,
            content:item.content,
            timestamp:item.timestamp
        })  
        comment.save((err,result)=>{
            if(err){
                errMsg = err.message
            }else{
                success = true
            }
        })
    })
    if(!success){
        res.jsonp({success:true,message: 'comments were successfully stored.'})
    }else{
        res.jsonp({success:false,message:errMsg})
    }
})

server.use(router)
server.listen(5050, ()=>{
    console.log('json server is running with port 5050')
})
