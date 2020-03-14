import { NextPage } from 'next';
import Post from '../../business/entities/Post';
import Layout from '../../components/layout/Layout';
import { Col } from 'reactstrap';
import PostCard from '../../components/post/PostCard';
import UserContext from '../../components/context/UserContext';
import { useContext, useState } from 'react';
import CommentInput from '../../components/comment/CommentInput';
import Comment from '../../business/entities/Comment';
import CommentCard from '../../components/comment/CommentCard';
import _ from 'lodash';

const PostPage: NextPage<{ post: Post; initialComments: Comment[] }> = ({ post, initialComments }) => {
	const { profile } = useContext(UserContext);
	const [comments, setComments] = useState(initialComments);

	const handleComment = (comment: Comment) => {
		let newcomments = _.clone(comments);
        if(newcomments==null) newcomments=[];
		newcomments.unshift(comment);
        setComments(newcomments);
    };
    
    const handleCommentChange=(comment:Comment)=>{
        setComments(comments.map(c=>c.uid==comment.uid?comment:c));
    }
	return (
		<Layout>
			<Col sm="12" md="9" className="py-md-2" tag="main">
				<PostCard post={post} />
				{profile && <CommentInput post={post} handleSuccess={handleComment} />}
				{comments.map(c => (
					<CommentCard key={c.uid} comment={c} post={post} handleChange={handleCommentChange}/>
				))}
			</Col>
		</Layout>
	);
};

PostPage.getInitialProps = async context => {
	const res = await fetch(`http://localhost:3000/api/posts/${context.query.id}`);
	const post: Post = await res.json();
	const initialComments: Comment[] = await (
		await fetch(`http://localhost:3000/api/posts/${post.uid}/comments`)
	).json();
	return { post, initialComments };
};

export default PostPage;
