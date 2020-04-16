import { FunctionComponent, useState } from 'react';
import { Card, CardHeader, CardBody, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCode, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import Post from '../../business/entities/Post';
import Moment from './Moment';
import styles from './PostCard.module.css';
import classNames from 'classnames';
import Link from 'next/link';
type Props = {
	post: Post;
};

const PostCard: FunctionComponent<Props> = ({ post }) => {
	const [vote, setVote] = useState(0);
	return (
		<Card className={styles.post}>
			<CardHeader>
				<Button color="secondary" className={styles.voteButton} onClick={() => setVote(vote + 1)}>
					<FontAwesomeIcon icon={faArrowUp} />
				</Button>
				<span>{vote}</span>
				<Button color="secondary" className={styles.voteButton} onClick={() => setVote(vote - 1)}>
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
						<FontAwesomeIcon icon={faCommentAlt} /> 57 Comments
					</a>
				</div>
			</CardBody>
		</Card>
	);
};

export default PostCard;
