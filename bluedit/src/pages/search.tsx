import { NextPage } from "next";
import Post from "../business/entities/Post";
import Layout from "../components/layout/Layout";
import SortContext from "../components/context/SortContext";
import { useContext, useState, useEffect } from "react";
import UserContext from "../components/context/UserContext";
import { better, topper, newer, older, comment } from "../helpers/comparators";
import _ from "lodash";
import { Col } from "reactstrap";
import PostCard from "../components/post/PostCard";
import SocketContext from "../components/context/SocketContext";
import Vote from "../business/entities/Vote";
import { server } from "../config";

const Search:NextPage<{initialPosts:Post[] }> =({initialPosts})=>{
    const {token,user}=useContext(UserContext);
    const [sortBy,setSortBy]=useState('best');
    const [posts,setPosts]=useState(initialPosts);
    const [myVotes,setMyVotes]=useState(new Map())
    const {socket}=useContext(SocketContext)

    useEffect(()=>{
        if(socket!=null){
            socket.emit('subscribe',posts.map(p=>p.uid))
            socket.off('votes')
            socket.on('votes',(data:any)=>{
                
                if(data.length>0){
                    const newPosts=_.cloneDeep(posts);
                    //@ts-ignore
                    data.forEach(d=>{
                        newPosts.forEach(np=>{
                            if(np.uid===d.uid) {np.upVote=d.upVote; np.downVote=d.downVote};
                        })
                    })
                    setPosts(newPosts);
                }
            })
        }
    },[posts]);

   useEffect(()=>{
        const func=async ()=>{
            if(user){
                const response=await fetch('/api/votes',{
                    method:'POST',
                    headers:{
                        'Authorization':token
                    },
                    body:JSON.stringify({comments:[],posts:posts.map(p=>p.uid)})
                });
                const p:{oid:string,direction:number}[]=await response.json();
                const m=new Map();
                p.forEach(c=>m.set(c.oid,c.direction));
                setMyVotes(m);
            }
        }
        func();
   },[posts,user]);

   const handlePostUpdate=(p:Post)=>{
        setPosts(posts.map(post=>{
                if(p.uid===post.uid) return p;
                else return post;
        }));
   }
   useEffect(()=>{
        switch(sortBy){
            case 'best': setPosts(_.cloneDeep(posts).sort(better)); break;
            case 'top': setPosts(_.cloneDeep(posts).sort(topper)); break;
            case 'new': setPosts(_.cloneDeep(posts).sort(newer)); break;
            case 'old': setPosts(_.cloneDeep(posts).sort(older)); break;
            case 'comment': setPosts(_.cloneDeep(posts).sort(comment)); break;
        }
   },[sortBy]);


   const sendVote=async (post:Post,v:Vote)=>{
    const response=await fetch('/api/votes/post',{
        method:'POST',
            headers:{
                'Authorization':token
            },
            body:JSON.stringify(v)
        });
        const p=await response.json();
        handlePostUpdate(p);
    }

    return (
        <SortContext.Provider value={{setSortBy}}>
        <Layout >
            <Col sm="9" md="6" className="py-md-2 bd-content" tag="main">
                    {posts&&(
                        posts.map(p=><PostCard key={p.uid} post={p} commentCount={p.comment}  voteDirection={myVotes.get(p.uid)} sendVote={sendVote}/>)
                    )}
            </Col>
        </Layout>
        </SortContext.Provider>
    )
}


Search.getInitialProps = async (context) => {
    const {q}=context.query;
    const postRes=await fetch(`${server}/api/posts?q=${q}`)
    const initialPosts:Post[]=await postRes.json();
    return { initialPosts};
};

export default Search;