import { FunctionComponent } from "react"

type Props={
    date:any
}
const Moment:FunctionComponent<Props>=({date})=>{
    const now=new Date();
    const dateObj=new Date();
    dateObj.setTime(date._seconds*1000)
    const fromNowInSeconds=(now.getTime()-dateObj.getTime())/1000;
    let value;
    if(fromNowInSeconds<60){
        value=Math.floor(fromNowInSeconds)+" seconds ago";
    }else if(fromNowInSeconds<60*60){
        value=Math.floor(fromNowInSeconds/60)+" minutes ago";
    }else if(fromNowInSeconds<60*60*24){
        value=Math.floor(fromNowInSeconds/60/60)+" hours ago";
    }else if(fromNowInSeconds<60*60*24*30){
        value=Math.floor(fromNowInSeconds/60/60/24)+" days ago";
    }else if(now.getFullYear()==dateObj.getFullYear()){
        value=Math.floor(now.getMonth()-dateObj.getMonth())+" months ago";
    }else value=Math.floor(now.getFullYear()-dateObj.getFullYear())+" years ago";
    
    return(
        <time dateTime={fromNowInSeconds.toString()}>
                {value}
        </time>
    )
}

export default Moment