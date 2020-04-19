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

const Search:NextPage<{initialPosts:Post[] }> =({initialPosts})=>{
    const [sortBy,setSortBy]=useState('best');
    const [posts,setPosts]=useState(initialPosts);

   useEffect(()=>{
        switch(sortBy){
            case 'best': setPosts(_.cloneDeep(posts).sort(better)); break;
            case 'top': setPosts(_.cloneDeep(posts).sort(topper)); break;
            case 'new': setPosts(_.cloneDeep(posts).sort(newer)); break;
            case 'old': setPosts(_.cloneDeep(posts).sort(older)); break;
            case 'comment': setPosts(_.cloneDeep(posts).sort(comment)); break;
        }
   },[sortBy]);

    return (
        <SortContext.Provider value={{setSortBy}}>
        <Layout >
            <Col sm="9" md="6" className="py-md-2 bd-content" tag="main">
                    {posts&&(
                        posts.map(p=><PostCard key={p.uid} post={p} commentCount={p.comment}/>)
                    )}
            </Col>
        </Layout>
        </SortContext.Provider>
    )
}


Search.getInitialProps = async (context) => {
    const {q}=context.query;
    const postRes=await fetch(`http://localhost:3000/api/posts?q=${q}`)
    const initialPosts:Post[]=await postRes.json();
    return { initialPosts};
};

export default Search;