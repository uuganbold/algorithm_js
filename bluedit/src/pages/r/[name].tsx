import Layout from "../../components/layout/Layout";
import { NextPage } from "next";
import Subbluedit from "../../business/entities/Subbluedit";
import { Container } from "next/app";
import { Row, Col } from "reactstrap";
import PostInput from "../../components/post/PostInput";
import Post from "../../business/entities/Post";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../components/context/UserContext";
import _ from "lodash";
import PostCard from "../../components/post/PostCard";
import fetch from 'isomorphic-unfetch'
import SortContext from "../../components/context/SortContext";
import { better, newer, older, topper } from "../../helpers/comparators";

const Subdit: NextPage<{ subdit: Subbluedit, initialPosts:Post[] }> = ({ subdit,initialPosts }) => {
    const [posts,setPosts]=useState(initialPosts);
    const [sortBy,setSortBy]=useState('best');
    const {user}=useContext(UserContext);
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
    },[sortBy])
    return(
        <SortContext.Provider value={{setSortBy}}>
        <Layout>
            <Col sm="9" md="6" className="py-md-2" tag="main">
            
            <Container>
                <Row>
                    <Col><h2>{subdit.name}</h2></Col>
                </Row>
                {
                    user&&(
                        <Row>
                    <Col>
                        <PostInput initialSubdit={subdit} handleSuccessPost={handlePost}/>
                    </Col>
                </Row>
                    )
                }
                <Row>
                    <Col>
                        {posts&&(
                            posts.map(p=><PostCard key={p.uid} post={p} commentCount={p.comment}/>)
                        )}
                    </Col>
                </Row>
            </Container>
            </Col>
        </Layout>
        </SortContext.Provider>
    )
}

Subdit.getInitialProps = async (context) => {
    //Reading user's information from the api. 
    //For the sake of good design, all network operations should be different layer, but so far it might be too much complexity
    //URI: http://[SERVER]/subbluedits/[name]
    const res=await fetch(`http://localhost:3000/api/subbluedits/${context.query.name}`);
    const subdit:Subbluedit=await res.json();
    const postRes=await fetch(`http://localhost:3000/api/posts?subbluedit=${subdit.uid}`)
    const initialPosts:Post[]=await postRes.json();
    return { subdit, initialPosts};
  };

export default Subdit;