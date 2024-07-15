import express from 'express';
import dotenv from "dotenv"
import cron from 'node-cron'
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';

import stocksRouter from './router/stock';
import cors from 'cors';
const socketIo = require('socket.io');
import { connectDataBase } from './config/database';
import { fetchCrypto, removeData } from './service/stock';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(cors());
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST']
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/crypto", stocksRouter)


app.use(express.static(path.join(__dirname, "../../client/build")))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
})


server.listen(PORT, async () => {
    await connectDataBase();
    
    io.on('connection', (socket: any) => {
        console.log('Client is connected to socket');
    
        socket.on('disconnect', () => {
            console.log('Client got disconnected from socket');
        });
    });
    
    console.log(`Server is running at ${PORT}`)
    
    cron.schedule('*/3 * * * * *', fetchCrypto);
    cron.schedule('*/3 * * * *', removeData);
})


export { io };