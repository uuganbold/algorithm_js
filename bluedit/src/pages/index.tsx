import React, { useState, Fragment } from 'react';
import { NextPage } from 'next';
import Header from './components/Header'
import Post from '../business/entities/Post';
import fetch from 'isomorphic-unfetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown, faCode, faCommentAlt, faAtom } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp, faArrowDown, faCode, faCommentAlt, faAtom)


import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,

    Media,
    FormGroup,
    Label,
    Col,
    Input
} from 'reactstrap';

    
const Home = () => (

    //const Home: NextPage<{ post: Post[] }> = ({ post }) => 
  
        <Fragment>
            <Header />
            <div className="canvas"> </div>


        <div className="home-elements">
            <div className="col-lg-12 mb-8 grid-margin">
                <div className="row mt-2">
                    <div className="create-posts">
                        <span>Create Post</span>
                        <Input type="textarea" name="text" id="exampleText" />
                        </div>
                </div>
                </div>
                    <div className="container-post">
                        <div className="row mt-2">
                            <div className="col-lg-12 mb-8 grid-margin">
                                <div className="card h-100">
                                    <div className="example"><Button className="vote-button"> <FontAwesomeIcon icon="arrow-up" /></Button> <span>1.7k</span>
                                        <Button className="vote-button"><FontAwesomeIcon icon="arrow-down" /></Button> </div>

                                    <div className="card-body-custom">
                                        <h4> <a href="/posts/post1" style={{ color: "#3E3E3E" }}>To the try hard LC people </a></h4>
                                        <FontAwesomeIcon icon="code" color="green" /> <span> <a href="">r/thecscareerquestions</a> </span>
                                        <span className="text-muted">Posted by <a href=""><span className="text-muted">u/rayyanshaji </span></a> </span> <span className="text-muted">8 hours ago </span>
                                        <p className="card-text">Thank you,
                                    Genuinely, thank you. A few months back I asked someone in a random thread about what they thought about my situation (good TC but locked into offer from beginning of September) and they recommended that I always keep interviewing Incase I get a better offer.
        I did 200 LC and applied to every big N company on the map, interviewed for months while balancing social life, school, multiple part time jobs.
                                </p>
                                        <a href="" className="comments-button"> <FontAwesomeIcon icon="comment-alt" /> 24 Comments </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-post">
                        <div className="row mt-5">
                            <div className="col-lg-12 mb-8 grid-margin">
                                <div className="card h-100">
                                    <div className="example"><Button className="vote-button"> <FontAwesomeIcon icon="arrow-up" /></Button> <span>3.4k</span>
                                        <Button className="vote-button"><FontAwesomeIcon icon="arrow-down" /></Button> </div>

                                    <div className="card-body-custom">
                                        <h4> <a href="/pages/api/post2" style={{ color: "#3E3E3E" }}> One dose of Magic Mushroom drug reduces anxiety and depression in cancer patients, study says </a> </h4>
                                        <FontAwesomeIcon icon="atom" color="#CD6155" /> <span> <a href="">r/science</a> </span>
                                        <span className="text-muted">Posted by <a href=""><span className="text-muted">u/weizhang</span></a> </span> <span className="text-muted">8 hours ago </span>
                                        <p className="card-text">Thank you,
                                    I saw a segment about this on 60 Minutes about six months ago. They used what they called "heroic doses." So, high-dose. They used it to treat addiction, anxiety and depression.

        Some people had good trips and some had bad. Even those with bad experiences often had good long-term results.
                                </p>
                                        <a href="" className="comments-button"> <FontAwesomeIcon icon="comment-alt" /> 14 Comments </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                </div>

                <div className="container-post">
                    <div className="row mt-5">
                        <div className="col-lg-12 mb-8 grid-margin">
                            <div className="card h-100">
                                <div className="example"><Button className="vote-button"> <FontAwesomeIcon icon="arrow-up" /></Button> <span>3.4k</span>
                                    <Button className="vote-button"><FontAwesomeIcon icon="arrow-down" /></Button> </div>

                                <div className="card-body-custom">
                                    <h4> <a href="/pages/api/post2" style={{ color: "#3E3E3E" }}> One dose of Magic Mushroom drug reduces anxiety and depression in cancer patients, study says </a> </h4>
                                    <FontAwesomeIcon icon="atom" color="#CD6155" /> <span> <a href="">r/science</a> </span>
                                    <span className="text-muted">Posted by <a href=""><span className="text-muted">u/weizhang</span></a> </span> <span className="text-muted">8 hours ago </span>
                                    <p className="card-text">Thank you,
                                I saw a segment about this on 60 Minutes about six months ago. They used what they called "heroic doses." So, high-dose. They used it to treat addiction, anxiety and depression.

    Some people had good trips and some had bad. Even those with bad experiences often had good long-term results.
                                </p>
                                    <a href="" className="comments-button"> <FontAwesomeIcon icon="comment-alt" /> 14 Comments </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

				<div className="container-post">
                    <div className="row mt-5">
                        <div className="col-lg-12 mb-8 grid-margin">
                            <div className="card h-100">
                                <div className="example"><Button className="vote-button"> <FontAwesomeIcon icon="arrow-up" /></Button> <span>3.4k</span>
                                    <Button className="vote-button"><FontAwesomeIcon icon="arrow-down" /></Button> </div>

                                <div className="card-body-custom">
                                    <h4> <a href="/pages/api/post2" style={{ color: "#3E3E3E" }}> One dose of Magic Mushroom drug reduces anxiety and depression in cancer patients, study says </a> </h4>
                                    <FontAwesomeIcon icon="atom" color="#CD6155" /> <span> <a href="">r/science</a> </span>
                                    <span className="text-muted">Posted by <a href=""><span className="text-muted">u/weizhang</span></a> </span> <span className="text-muted">8 hours ago </span>
                                    <p className="card-text">Thank you,
                                I saw a segment about this on 60 Minutes about six months ago. They used what they called "heroic doses." So, high-dose. They used it to treat addiction, anxiety and depression.

    Some people had good trips and some had bad. Even those with bad experiences often had good long-term results.
                                </p>
                                    <a href="" className="comments-button"> <FontAwesomeIcon icon="comment-alt" /> 14 Comments </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

				<div className="container-post">
                    <div className="row mt-5">
                        <div className="col-lg-12 mb-8 grid-margin">
                            <div className="card h-100">
                                <div className="example"><Button className="vote-button"> <FontAwesomeIcon icon="arrow-up" /></Button> <span>3.4k</span>
                                    <Button className="vote-button"><FontAwesomeIcon icon="arrow-down" /></Button> </div>

                                <div className="card-body-custom">
                                    <h4> <a href="/pages/api/post2" style={{ color: "#3E3E3E" }}> One dose of Magic Mushroom drug reduces anxiety and depression in cancer patients, study says </a> </h4>
                                    <FontAwesomeIcon icon="atom" color="#CD6155" /> <span> <a href="">r/science</a> </span>
                                    <span className="text-muted">Posted by <a href=""><span className="text-muted">u/weizhang</span></a> </span> <span className="text-muted">8 hours ago </span>
                                    <p className="card-text">Thank you,
                                I saw a segment about this on 60 Minutes about six months ago. They used what they called "heroic doses." So, high-dose. They used it to treat addiction, anxiety and depression.

    Some people had good trips and some had bad. Even those with bad experiences often had good long-term results.
                                </p>
                                    <a href="" className="comments-button"> <FontAwesomeIcon icon="comment-alt" /> 14 Comments </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

				<div className="container-post">
                    <div className="row mt-5">
                        <div className="col-lg-12 mb-8 grid-margin">
                            <div className="card h-100">
                                <div className="example"><Button className="vote-button"> <FontAwesomeIcon icon="arrow-up" /></Button> <span>3.4k</span>
                                    <Button className="vote-button"><FontAwesomeIcon icon="arrow-down" /></Button> </div>

                                <div className="card-body-custom">
                                    <h4> <a href="/pages/api/post2" style={{ color: "#3E3E3E" }}> One dose of Magic Mushroom drug reduces anxiety and depression in cancer patients, study says </a> </h4>
                                    <FontAwesomeIcon icon="atom" color="#CD6155" /> <span> <a href="">r/science</a> </span>
                                    <span className="text-muted">Posted by <a href=""><span className="text-muted">u/weizhang</span></a> </span> <span className="text-muted">8 hours ago </span>
                                    <p className="card-text">Thank you,
                                I saw a segment about this on 60 Minutes about six months ago. They used what they called "heroic doses." So, high-dose. They used it to treat addiction, anxiety and depression.

    Some people had good trips and some had bad. Even those with bad experiences often had good long-term results.
                                </p>
                                    <a href="" className="comments-button"> <FontAwesomeIcon icon="comment-alt" /> 14 Comments </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

				<div className="container-post">
                    <div className="row mt-5">
                        <div className="col-lg-12 mb-8 grid-margin">
                            <div className="card h-100">
                                <div className="example"><Button className="vote-button"> <FontAwesomeIcon icon="arrow-up" /></Button> <span>3.4k</span>
                                    <Button className="vote-button"><FontAwesomeIcon icon="arrow-down" /></Button> </div>

                                <div className="card-body-custom">
                                    <h4> <a href="/pages/api/post2" style={{ color: "#3E3E3E" }}> One dose of Magic Mushroom drug reduces anxiety and depression in cancer patients, study says </a> </h4>
                                    <FontAwesomeIcon icon="atom" color="#CD6155" /> <span> <a href="">r/science</a> </span>
                                    <span className="text-muted">Posted by <a href=""><span className="text-muted">u/weizhang</span></a> </span> <span className="text-muted">8 hours ago </span>
                                    <p className="card-text">Thank you,
                                I saw a segment about this on 60 Minutes about six months ago. They used what they called "heroic doses." So, high-dose. They used it to treat addiction, anxiety and depression.

    Some people had good trips and some had bad. Even those with bad experiences often had good long-term results.
                                </p>
                                    <a href="" className="comments-button"> <FontAwesomeIcon icon="comment-alt" /> 14 Comments </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                

            </div>

        </Fragment>
    )

/*    Home.getInitialProps = async (context) => {
        //Reading Post's information from the api. 
        //For the sake of good design, all network operations should be different layer, but so far it might be too much complexity
        //URI: http://[SERVER]/Posts/[Postname]
        const res = await fetch(`http://localhost:3000/api/post`);
        const post: Post[] = await res.json();
        return { post };
    };*/
        
/*Home.propTypes = {
    light: PropTypes.bool,
    dark: PropTypes.bool,
    fixed: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
}*/
 
export default Home;
