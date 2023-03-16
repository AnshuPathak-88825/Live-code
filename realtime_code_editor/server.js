const express=require('express');
const {Server}=require('socket.io');

const app=express();
const https=require('https');
const server=https.createServer(app);
const io=new Server(server);
const PORT=process.env.PORT||5000;
server.listen(PORT,()=>console.log(`listening on PORT ${PORT}`));
