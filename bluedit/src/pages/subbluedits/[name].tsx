import Layout from "../../components/Layout";
import { NextPage } from "next";
import Subbluedit from "../../business/entities/Subbluedit";
import { Container } from "next/app";
import { Row, Col } from "reactstrap";
import PostInput from "../../components/PostInput";
import Post from "../../business/entities/Post";
import { useState, useContext } from "react";
import UserContext from "../../components/UserContext";
import _ from "lodash";

const Subdit: NextPage<{ subdit: Subbluedit, initialPosts:Post[] }> = ({ subdit,initialPosts }) => {
    const [posts,setPosts]=useState(initialPosts);
    const {user}=useContext(UserContext);
    const handlePost=(p:Post)=>{
         posts.unshift(p);
         setPosts(_.cloneDeep(posts));
    }
    return(
        <Layout>
            <Container>
                <Row>
                    <Col>{subdit.name}</Col>
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
                        {posts.map(p=>(
                            <div key={p.uid}>{p.name}</div>
                        ))}
                    </Col>
                </Row>
            </Container>
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