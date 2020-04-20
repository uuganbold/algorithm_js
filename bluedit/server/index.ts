import express, { Request, Response } from "express";
import next from "next";
import http from 'http'
import SocketIO from 'socket.io'
import VotesPubSubManager from "../src/helpers/VotesPubSubManager";


const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await nextApp.prepare();
    const app = express();
    const server = http.createServer(app);
    const io=SocketIO(server);

    const pubSubManager=new VotesPubSubManager();
    //@ts-ignore
    global.pubSubManager=pubSubManager;

    io.on('connect',socket=>{
        console.log('client connecteds')
        socket.on('subscribe',(msg)=>{
             pubSubManager.subscribe(socket,msg);
        })

        socket.on('disconnect', function(){
            pubSubManager.unsubscribe(socket)
            console.log('user disconnected');
          });
    })
    
    app.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();