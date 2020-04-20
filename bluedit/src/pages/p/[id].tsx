import { NextPage } from 'next';
import Post from '../../business/entities/Post';
import Layout from '../../components/layout/Layout';
import { Col } from 'reactstrap';
import PostCard from '../../components/post/PostCard';
import UserContext from '../../components/context/UserContext';
import { useContext, useState, FormEvent } from 'react';
import CommentInput from '../../components/comment/CommentInput';
import Comment, {CommentTreeNode} from '../../business/entities/Comment';
import CommentCard from '../../components/comment/CommentCard';
import _ from 'lodash';
import fetch from 'isomorphic-unfetch'
import { better, topper, newer, older, user } from '../../helpers/comparators';
import { DateLike } from '../../business/entities/HasDate';

const createCommentTree=(comments:Comment[]):CommentTreeNode[]=>{
	const commentMap=new Map<string,CommentTreeNode>();
	const result=new Array<CommentTreeNode>();
	comments.forEach(c=>commentMap.set(c.uid,{comment:c,children:[]}));
	commentMap.forEach((treeNode,uid)=>{
		 if(treeNode.comment.parentid==null) result.push(treeNode);
		 else{
			const parent:CommentTreeNode=commentMap.get(treeNode.comment.parentid);
			if(parent==null) {result.push(treeNode); return;}
			let siblings:CommentTreeNode[]=parent.children;
			if(siblings==null) {siblings=[]; parent.children=siblings }
			siblings.push(treeNode);
		 }
	})
	return result;
}

const PostPage: NextPage<{ post: Post; initialComments: Comment[] }> = ({ post, initialComments }) => {
	const { profile } = useContext(UserContext);
	const [comments, setComments] = useState(initialComments.sort(better));
	
	const handleComment = (comment: Comment) => {
		let newcomments = _.clone(comments);
        if(newcomments==null) newcomments=[];
		newcomments.unshift(comment);
		setComments(newcomments);
    };

	const sortComments=(comparator:(v1:Comment, v2:Comment)=>number)=>{
		 setComments(_.clone(comments).sort(comparator));
	}
	
	const handleSort=(e:FormEvent<HTMLSelectElement>)=>{
		const sortBy=e.currentTarget.value;
		switch(sortBy){
			case 'best': sortComments(better); break;
			case 'top': sortComments(topper); break;
			case 'new': sortComments(newer); break;
			case 'old': sortComments(older); break;
			case 'user': sortComments(user); break;
		}
	}
	return (
		<Layout>
			<Col sm="12" md="9" className="py-md-2" tag="main">
				<PostCard post={post} commentCount={comments.length}/>
				{profile && <CommentInput post={post} handleSuccess={handleComment} />}
				<div>SORT BY
					<select onChange={handleSort}>
						<option value='best'>Best</option>
						<option value='top'>Top</option>
						<option value='new'>New</option>
						<option value='old'>Old</option>
						<option value='user'>User</option>
					</select>
				</div>
				{createCommentTree(comments).map((node,uid) => (
					<CommentCard key={uid} node={node} post={post} handleComment={handleComment}/>
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
