import	express from 'express'
import logger from 'morgan'
import {Server} from 'socket.io'
import {createServer} from 'node:http'

const port = process.env.PORT ?? 3000

const compression = require("compression");
const helmet = require("helmet");

const app = express()
const server= createServer(app)
const io = new Server(server)

app.use(compression()); // Compress all routes

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
        },
    }),
);

io.on ('connection',(socket)=>{
    console.log ('se ha conetado un chirihuillo')
    socket.on('disconnect',()=>{
        console.log('Ya se fue un chirihuillo')
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})



app.use(logger('dev'))

app.get('/', (req, res)=>{
    res.sendFile(process.cwd()+'/Cliente/index.html')
})

server.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})