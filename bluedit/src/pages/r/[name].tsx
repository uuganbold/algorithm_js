import Layout from "../../components/layout/Layout";
import { NextPage } from "next";
import Subbluedit from "../../business/entities/Subbluedit";
import { Container } from "next/app";
import { Row, Col } from "reactstrap";
import PostInput from "../../components/post/PostInput";
import Post from "../../business/entities/Post";
import { useState, useContext } from "react";
import UserContext from "../../components/context/UserContext";
import _ from "lodash";
import PostCard from "../../components/post/PostCard";
import fetch from 'isomorphic-unfetch'

const Subdit: NextPage<{ subdit: Subbluedit, initialPosts:Post[] }> = ({ subdit,initialPosts }) => {
    const [posts,setPosts]=useState(initialPosts);
    const {user}=useContext(UserContext);
    const handlePost=(p:Post)=>{
         posts.unshift(p);
         setPosts(_.cloneDeep(posts));
    }
    return(
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
                            posts.map(p=><PostCard key={p.uid} post={p}/>)
                        )}
                    </Col>
                </Row>
            </Container>
            </Col>
        </Layout>
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