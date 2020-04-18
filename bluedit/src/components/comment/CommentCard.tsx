import { FunctionComponent, useState, useContext } from 'react';
import Comment, { CommentTreeNode } from '../../business/entities/Comment';
import { Button } from 'reactstrap';
import styles from './CommentCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlus, faReply } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Moment from '../post/Moment';
import CommentInput from './CommentInput';
import Post from '../../business/entities/Post';
import _ from 'lodash';
import Vote, { VoteDirection } from '../../business/entities/Vote';
import UserContext from '../context/UserContext';

const CommentCard: FunctionComponent<{ node: CommentTreeNode, post: Post, handleComment:(c:Comment)=>void}> = ({ node, post, handleComment }) => {
	const comment=node.comment;
	const [isOpen, setIsOpen] = useState(true);
	const [isReply, setIsReply] = useState(false);
	const [vote,setVote]=useState((comment.upVote)-(comment.downVote));
	const {token,profile}=useContext(UserContext)

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const toggleReply = () => {
		setIsReply(!isReply);
	};

	const handleReply = (reply: Comment) => {
		toggleReply();
		handleComment(reply);	
    };
    
     const childChange=(child:Comment)=>{
		handleComment(child);
	} 
	
	const sendVote=(vote:Vote)=>{
		fetch('/api/votes/comment',{
            method:'POST',
            headers:{
                'Authorization':token
			},
			body:JSON.stringify(vote)
        }).then(async response=>{
            return response.json();
        }).then(p=>{
            setVote((p.upVote)-(p.downVote));
        });
	}

	const upVote=()=>{
		sendVote({oid:comment.uid,direction:VoteDirection.UP,user:profile.uid})
	}

	const downVote=()=>{
		sendVote({oid:comment.uid,direction:VoteDirection.DOWN,user:profile.uid})
	}

	const source = (
		<div className={styles.source}>
			<Link href="/u/[username] " as={`/u/${comment.user.username}`} passHref>
				<a>{comment.user.username}</a>
			</Link>
			<span className={styles.voteCount}>{vote} points</span>
			<Moment date={comment.post_date} />
		</div>
	);

	if (isOpen) {
		return (
			<div className={styles.comment}>
				<div className={styles.vote}>
					<Button onClick={upVote}>
						<FontAwesomeIcon icon={faArrowUp} />
					</Button>
					<Button onClick={downVote}>
						<FontAwesomeIcon icon={faArrowDown} />
					</Button>
					<Button className={styles.ocButton} onClick={toggleOpen}>
						{' '}
					</Button>
				</div>
				<div className={styles.body}>
					{source}
					<div>{comment.text}</div>
					<div className={styles.toolbar}>
						<Button onClick={toggleReply}>
							<FontAwesomeIcon icon={faReply} /> Reply
						</Button>
					</div>
					{isReply && <CommentInput post={post} parent={comment} handleSuccess={handleReply} />}
					{node.children &&
						node.children.length > 0 &&
						node.children.map(child => <CommentCard key={child.comment.uid} post={post} node={child} handleComment={childChange}/>)}
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles.comment}>
				<div className={styles.vote}>
					<Button onClick={toggleOpen}>
						<FontAwesomeIcon icon={faPlus} />
					</Button>
				</div>
				<div className={styles.body}>
                    {source}
                </div>
			</div>
		);
	}
};

export default CommentCard;
