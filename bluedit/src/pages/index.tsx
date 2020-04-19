import Layout from "../components/layout/Layout";
import {
    Card,
    Col,
    CardHeader,
    ListGroup,
    ListGroupItem,
    CardBody,
    CardSubtitle,
    CardTitle,
    CardText,
    Button, Alert
} from "reactstrap";
import PostInput from "../components/post/PostInput";
import { NextPage } from "next";
import Post from "../business/entities/Post";
import { useState, useContext, useEffect } from "react";
import PostCard from "../components/post/PostCard";
import UserContext from "../components/context/UserContext";
import _ from "lodash";
import SortContext from "../components/context/SortContext";
import { better, topper, newer, older } from "../helpers/comparators";
import {getState, setState} from "expect/build/jestMatchersObject";



let text = 'Join In';

const handleTextChange = ()=>{
    if(text == 'Join In') {
        alert("You are now joined to learntocode!") ;
    } else {
        alert("already Joined") ;
    }
    text = 'Joined';
};

const Index:NextPage<{initialPosts:Post[] }> =({initialPosts})=>{
    const {user}=useContext(UserContext);
    const [sortBy,setSortBy]=useState('best');
    const [posts,setPosts]=useState(initialPosts);
    setState({text: 'Join In'});
    const handlePost=(p:Post)=>{
        posts.unshift(p);
        setPosts(_.cloneDeep(posts));
   }

   useEffect(()=>{
        switch(sortBy){
            case 'best': setPosts(_.cloneDeep(posts).sort(better)); break;
            case 'top': setPosts(_.cloneDeep(posts).sort(topper)); break;
            case 'new': setPosts(_.cloneDeep(posts).sort(newer)); break;
            case 'old': setPosts(_.cloneDeep(posts).sort(older)); break;
        }
   },[sortBy]);
    return (
        <SortContext.Provider value={{setSortBy}}>
        <Layout >
            <Col sm="9" md="6" className="py-md-2 bd-content" tag="main">
                    {
                        user&&(
                            <PostInput handleSuccessPost={handlePost}/>                    
                        )
                    }
                    {posts&&(
                        posts.map(p=><PostCard key={p.uid} post={p} commentCount={p.comment}/>)
                    )}
            </Col>
            <div className="d-none d-md-block col-md-3 bd-toc py-md-3">
                    <Card>
                        <CardHeader className="bg-primary text-light">Up-and-Coming Communities</CardHeader>
                        <ListGroup flush>
                            <ListGroupItem>
                                <div>
                                    <span>learntocode</span>
                                    <br/>
                                    <text>A group for members who are looking for advice on coding and posts related to it</text>
                                    <br/>
                                    <br/>
                                    <text>1.3K</text>
                                    <br/>
                                    <text>Members</text>
                                    <br/>
                                    <text>Created on Sep 28, 2012</text>
                                    <br/>
                                    <br/>
                                    <Button onClick={handleTextChange}>{text}</Button>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </div>
        </Layout>
        </SortContext.Provider>
    )
}

Index.getInitialProps = async (context) => {
    const postRes=await fetch(`http://localhost:3000/api/posts`)
    const initialPosts:Post[]=await postRes.json();
    return { initialPosts};
};

export default Index;
