import { FunctionComponent, useState } from 'react';
import Comment from '../../business/entities/Comment';
import { Button } from 'reactstrap';
import styles from './CommentCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlus, faReply } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Moment from '../post/Moment';
import CommentInput from './CommentInput';
import Post from '../../business/entities/Post';
import _ from 'lodash';

const CommentCard: FunctionComponent<{ comment: Comment, post: Post, handleChange:(comment:Comment)=>void }> = ({ comment, post,handleChange }) => {
	const [isOpen, setIsOpen] = useState(true);
	const [isReply, setIsReply] = useState(false);
	const [children, setChildren] = useState(comment.children);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const toggleReply = () => {
		setIsReply(!isReply);
	};

	const handleReply = (reply: Comment) => {
		toggleReply();
        let newchildren = _.clone(children);
        if(newchildren==null) newchildren=[];
		newchildren.unshift(reply);
        setChildren(newchildren);
        comment.children=newchildren;
        handleChange(comment);
    };
    
    const childChange=(child:Comment)=>{
        setChildren(children.map(c=>c.uid==child.uid?child:c));
    }

	const source = (
		<div className={styles.source}>
			<Link href="/u/[username] " as={`/u/${comment.user.username}`} passHref>
				<a>{comment.user.username}</a>
			</Link>
			<span className={styles.voteCount}>{comment.vote} points</span>
			<Moment date={comment.post_date} />
		</div>
	);

	if (isOpen) {
		return (
			<div className={styles.comment}>
				<div className={styles.vote}>
					<Button>
						<FontAwesomeIcon icon={faArrowUp} />
					</Button>
					<Button>
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
					{children &&
						children.length > 0 &&
						children.map(child => <CommentCard key={child.uid} post={post} comment={child} handleChange={childChange}/>)}
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
