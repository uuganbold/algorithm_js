import React, { useState, Fragment } from 'react';
import Layout from '../components/Layout';
import { NextPage } from 'next';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp, faArrowDown, faCode, faCommentAlt, faAtom } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowUp, faArrowDown, faCode, faCommentAlt, faAtom);

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
	Input,
} from 'reactstrap';

//const Home = () => {

function post1() {
	return (
		<div>
			<Fragment>
				<Layout />
				<div className="canvas"> </div>
				<div className="postbackground">
					<div className="container-post-individual">
						<div className="row ml-1">
							<div className="col-lg-8 mb-6 grid-margin">
								<div className="card h-300">
									<div className="example">
										<Button className="vote-button">
											{' '}
											<FontAwesomeIcon icon="arrow-up" />
										</Button>{' '}
										<span>1.7k</span>
										<Button className="vote-button">
											<FontAwesomeIcon icon="arrow-down" />
										</Button>{' '}
									</div>

									<div className="card-body-custom">
										<h4>
											{' '}
											<a href="/posts/post1" style={{ color: '#3E3E3E' }}>
												To the try hard LC peoples{' '}
											</a>
										</h4>
										<FontAwesomeIcon icon="code" color="green" />{' '}
										<span>
											{' '}
											<a href="">r/thecscareerquestions</a>{' '}
										</span>
										<span className="text-muted">
											Posted by{' '}
											<a href="">
												<span className="text-muted">u/rayyanshaji </span>
											</a>{' '}
										</span>{' '}
										<span className="text-muted">8 hours ago </span>
										<p className="card-text">
											Thank you, Genuinely, thank you. A few months back I asked someone in a
											random thread about what they thought about my situation (good TC but locked
											into offer from beginning of September) and they recommended that I always
											keep interviewing Incase I get a better offer. I did 200 LC and applied to
											every big N company on the map, interviewed for months while balancing
											social life, school, multiple part time jobs.
										</p>
										<a href="" className="comments-button">
											{' '}
											<FontAwesomeIcon icon="comment-alt" /> 24 Comments{' '}
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-8 mb-6 ml-4 grid-margin" style={{ border: '1 px solid green' }}>
							<span>Comment Down</span>
							<Input type="textarea" name="text" id="exampleText" />
						</div>

						<div className="comments-section">
							<div className="media-comment">
								<div className="empty-space">
									<div className="media-body">
										<div className="lineholder"></div>
										<div className="comment-box">
											<p className="mt-0">
												<a href="">uuganbold</a>
											</p>
											Congrats rayyanshaji. We are all so proud of you. LC does help and I am
											working on it daily. I almost do about 10 easy problems and 3-4 medium
											problems a day. I've been applying to a lot of companies and trying my best
											to pass their interviews. Thanks so much for your honest post.
										</div>
									</div>
								</div>
							</div>

							<div className="media-comment mt-3" style={{ paddingLeft: '19px' }}>
								<div className="empty-space">
									<div className="media-body">
										<div className="lineholder"></div>
										<div className="comment-box">
											<p className="mt-0">
												<a href="">weizhang</a>
											</p>
											Although LC might seem to work. It might have only worked for you because
											the same companies use the SAME questions from LeetCode for their
											interviews. I am not trying to hate on LeetCode but just trying to state
											some realistic facts of possibilities.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		</div>
	);
}

export default post1;
