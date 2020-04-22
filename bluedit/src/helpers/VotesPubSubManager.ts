import Voteable from "../business/entities/Voteable";

export default class VotesPubSubManager {

    objects:Map<string,Voteable>;
    subscribers:Map<string,{subscriber:SocketIO.Socket,obj:string[]}>;
    brokerId:NodeJS.Timeout;

    constructor() {
        this.subscribers=new Map();
        this.objects=new Map();
        this.brokerId = global.setInterval(() => { this.broker() }, 1000);
    }
    subscribe(subscriber:SocketIO.Socket, objectsToSubscribe:[]) {
        this.subscribers.set(subscriber.id,{subscriber:subscriber,obj:objectsToSubscribe});
    }

    unsubscribe(subscriber:SocketIO.Socket){
        this.subscribers.delete(subscriber.id);
    }

    removeBroker() {
        clearInterval(this.brokerId);
    }

    publish(voteable:Voteable) {
        this.objects.set(voteable.uid,voteable);
    }

    broker() {
        for(let sub of this.subscribers.values()){
            const message:Array<{uid:string,upVote:number,downVote:number}>=[];
            this.objects.forEach((v,k)=>{
                if(sub.obj.includes(k)){
                    message.push({uid:v.uid,upVote:v.upVote,downVote:v.downVote});
                }
            })
            sub.subscriber.emit('votes',message);
        }

        this.objects=new Map();
        
    } 
}