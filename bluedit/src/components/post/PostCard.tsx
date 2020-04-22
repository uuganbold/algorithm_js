import { FunctionComponent, useState, useContext } from 'react';
import { Card, CardHeader, CardBody, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCode, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import Post from '../../business/entities/Post';
import Moment from './Moment';
import styles from './PostCard.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import UserContext from '../context/UserContext';
import Vote, { VoteDirection } from '../../business/entities/Vote';
// import FB from 'FB';
type Props = {
	post: Post;
	commentCount:number;
	voteDirection:number;
	sendVote:(post:Post,v:Vote)=>void
};

const PostCard: FunctionComponent<Props> = ({ post, commentCount, voteDirection, sendVote }) => {

	const voteButtonUp = `up voteButton`;
	const voteButtonDown = `down voteButton`;
	const {profile}=useContext(UserContext)
	
	const upVote=()=>{
		sendVote(post,{oid:post.uid,direction:VoteDirection.UP,user:profile.uid})
	}

	const downVote=()=>{
		sendVote(post,{oid:post.uid,direction:VoteDirection.DOWN,user:profile.uid})
	}

	const copyFunc=()=>{
		console.log()
	}
	return (
		<Card className={styles.post}>
			<CardHeader>
				<Button color="secondary" className={classNames(styles.voteButtonUp,voteDirection===VoteDirection.UP?styles.active:'')}  onClick={upVote}>
					<FontAwesomeIcon icon={faArrowUp}/>
				</Button>
				<span>{post.upVote-post.downVote}</span>
				<Button color="secondary" className={classNames(styles.voteButtonDown,voteDirection===VoteDirection.DOWN?styles.active:'')} onClick={downVote}>
					<FontAwesomeIcon icon={faArrowDown} />
				</Button>
			</CardHeader>
			<CardBody>
				<CardTitle>
					<Link href="/p/[id]" as={`/p/${post.uid}`} passHref>
						<a>{post.name}</a>
					</Link>
				</CardTitle>
                <CardSubtitle>
					<Link href="/r/[name]" as={`/r/${post.subbluedit.name}`} passHref>
						<a className={styles.subdit}>
							<FontAwesomeIcon icon={faCode} /> r/{post.subbluedit.name}
						</a>
					</Link>
					<Link href="/u/[username]" as={`/u/${post.user.username}`} passHref>
						<a className={classNames(styles.user,'text-muted')}>u/{post.user.username}</a>
					</Link>
					<Link href="/p/[id]" as={`/p/${post.uid}`} passHref>
						<a className={classNames(styles.date,'text-muted')}>
							<Moment date={post.post_date} />
						</a>
					</Link>
				</CardSubtitle>
				<CardText>{post.text}</CardText>
				<div className={styles.toolbar}>
					<a href="/">
						<FontAwesomeIcon icon={faCommentAlt} /> {commentCount} Comments
					</a>
				</div>

			</CardBody>
		</Card>
	);
};

export default PostCard;
