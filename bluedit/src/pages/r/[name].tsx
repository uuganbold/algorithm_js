import Layout from '../../components/layout/Layout';
import { NextPage } from 'next';
import Subbluedit from '../../business/entities/Subbluedit';
import { Container } from 'next/app';
import { Row, Col } from 'reactstrap';
import PostInput from '../../components/post/PostInput';
import Post from '../../business/entities/Post';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../../components/context/UserContext';
import _ from 'lodash';
import PostCard from '../../components/post/PostCard';
import fetch from 'isomorphic-unfetch';
import SortContext from '../../components/context/SortContext';
import { better, newer, older, topper,comment } from '../../helpers/comparators';
import SocketContext from '../../components/context/SocketContext';
import Vote from '../../business/entities/Vote';
import { server } from '../../config';

const Subdit: NextPage<{ subdit: Subbluedit; initialPosts: Post[] }> = ({ subdit, initialPosts }) => {
	const [posts, setPosts] = useState(initialPosts);
	const [sortBy, setSortBy] = useState('best');
    const { token, user } = useContext(UserContext);
    const [myVotes,setMyVotes]=useState(new Map())
    const {socket}=useContext(SocketContext)

	const handlePost = (p: Post) => {
		posts.unshift(p);
		setPosts(_.cloneDeep(posts));
	};

	useEffect(() => {
		if (socket != null) {
			socket.emit(
				'subscribe',
				posts.map((p) => p.uid)
			);
			socket.off('votes');
			socket.on('votes', (data: any) => {

				if(data>0){
					const newPosts = _.cloneDeep(posts);
					//@ts-ignore
					data.forEach((d) => {
						newPosts.forEach((np) => {
							if (np.uid === d.uid) {
								np.upVote = d.upVote;
								np.downVote = d.downVote;
							}
						});
					});
					setPosts(newPosts);
				}

			});
		}
	}, [posts]);

	useEffect(() => {
		const func = async () => {
			if (user) {
				const response = await fetch('/api/votes', {
					method: 'POST',
					headers: {
						Authorization: token,
					},
					body: JSON.stringify({ comments: [], posts: posts.map((p) => p.uid) }),
				});
				const p: { oid: string; direction: number }[] = await response.json();
				const m = new Map();
				p.forEach((c) => m.set(c.oid, c.direction));
				setMyVotes(m);
			}
		};
		func();
	}, [posts, user]);

	const handlePostUpdate = (p: Post) => {
		setPosts(
			posts.map((post) => {
				if (p.uid === post.uid) return p;
				else return post;
			})
		);
	};
	useEffect(() => {
		switch (sortBy) {
			case 'best':
				setPosts(_.cloneDeep(posts).sort(better));
				break;
			case 'top':
				setPosts(_.cloneDeep(posts).sort(topper));
				break;
			case 'new':
				setPosts(_.cloneDeep(posts).sort(newer));
				break;
			case 'old':
				setPosts(_.cloneDeep(posts).sort(older));
                break;
            case 'comment':
                setPosts(_.cloneDeep(posts).sort(comment));
                break;
		}
	}, [sortBy]);

	const sendVote = async (post: Post, v: Vote) => {
		const response = await fetch('/api/votes/post', {
			method: 'POST',
			headers: {
				Authorization: token,
			},
			body: JSON.stringify(v),
		});
		const p = await response.json();
		handlePostUpdate(p);
	};
	return (
		<SortContext.Provider value={{ setSortBy }}>
			<Layout>
				<Col sm="9" md="6" className="py-md-2" tag="main">
					<Container>
						<Row>
							<Col>
								<h2>{subdit.name}</h2>
							</Col>
						</Row>
						{user && (
							<Row>
								<Col>
									<PostInput initialSubdit={subdit} handleSuccessPost={handlePost} />
								</Col>
							</Row>
						)}
						<Row>
							<Col>
								{posts &&
									posts.map((p) => (
										<PostCard
											key={p.uid}
											post={p}
											commentCount={p.comment}
											voteDirection={myVotes.get(p.uid)}
											sendVote={sendVote}
										/>
									))}
							</Col>
						</Row>
					</Container>
				</Col>
			</Layout>
		</SortContext.Provider>
	);
};

Subdit.getInitialProps = async (context) => {
	//Reading user's information from the api.
	//For the sake of good design, all network operations should be different layer, but so far it might be too much complexity
	//URI: http://[SERVER]/subbluedits/[name]
	const res = await fetch(`${server}/api/subbluedits/${context.query.name}`);
	const subdit: Subbluedit = await res.json();
	const postRes = await fetch(`${server}/api/posts?subbluedit=${subdit.uid}`);
	const initialPosts: Post[] = await postRes.json();
	return { subdit, initialPosts };
};

export default Subdit;
