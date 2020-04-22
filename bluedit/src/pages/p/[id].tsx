import { NextPage } from 'next';
import Post from '../../business/entities/Post';
import Layout from '../../components/layout/Layout';
import { Col } from 'reactstrap';
import PostCard from '../../components/post/PostCard';
import UserContext from '../../components/context/UserContext';
import { useContext, useState, FormEvent, useEffect } from 'react';
import CommentInput from '../../components/comment/CommentInput';
import Comment, {CommentTreeNode} from '../../business/entities/Comment';
import CommentCard from '../../components/comment/CommentCard';
import _ from 'lodash';
import fetch from 'isomorphic-unfetch'
import { better, topper, newer, older, user } from '../../helpers/comparators';
import { DateLike } from '../../business/entities/HasDate';
import SocketContext from '../../components/context/SocketContext';
import Vote from '../../business/entities/Vote';
import { server } from '../../config';

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
	const [postState,setPost]=useState(post);
	const { token,user,profile } = useContext(UserContext);
	const [comments, setComments] = useState(initialComments.sort(better));
	const [myVotes,setMyVotes]=useState(new Map())
    const {socket}=useContext(SocketContext)
	
	useEffect(()=>{
        if(socket!=null){
            socket.emit('subscribe',comments.map(p=>p.uid).concat([postState.uid]))
            socket.off('votes')
            socket.on('votes',(data:any)=>{

				if(data.length>0){
					const newComments=_.cloneDeep(comments);
					//@ts-ignore
					data.forEach(d=>{
						if(d.uid===post.uid){
							postState.upVote=d.upVote;
							postState.downVote=d.downVote;
							setPost(postState);
						}
						newComments.forEach(np=>{
							if(np.uid===d.uid) {np.upVote=d.upVote; np.downVote=d.downVote};
						})
					})
					setComments(newComments);
				}

            })
        }
	},[comments]);
	
	useEffect(()=>{
        const func=async ()=>{
            if(user){
                const response=await fetch('/api/votes',{
                    method:'POST',
                    headers:{
                        'Authorization':token
                    },
                    body:JSON.stringify({comments:comments.map(c=>c.uid),posts:[postState.uid]})
                });
                const p:{oid:string,direction:number}[]=await response.json();
                const m=new Map();
                p.forEach(c=>m.set(c.oid,c.direction));
                setMyVotes(m);
            }
        }
        func();
   },[comments,user]);

	const handleComment = (comment: Comment) => {
		let newcomments = _.clone(comments);
        if(newcomments==null) newcomments=[];
		newcomments.unshift(comment);
		setComments(newcomments);
    };

	const sortComments=(comparator:(v1:Comment, v2:Comment)=>number)=>{
		 setComments(_.clone(comments).sort(comparator));
	}

	const handleCommentUpdate=(c:Comment)=>{
        setComments(comments.map(comment=>{
                if(c.uid===comment.uid) return c;
                else return comment;
        }));
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

	const sendPostVote=async (post:Post,v:Vote)=>{
        const response=await fetch('/api/votes/post',{
            method:'POST',
            headers:{
                'Authorization':token
            },
            body:JSON.stringify(v)
        });
        const p=await response.json();
        setPost(p);
	}
	
	const sendCommentVote=async (v:Vote)=>{
        const response=await fetch('/api/votes/comment',{
            method:'POST',
            headers:{
                'Authorization':token
            },
            body:JSON.stringify(v)
        });
        const p=await response.json();
        handleCommentUpdate(p);
	}

	return (
		<Layout>
			<Col sm="12" md="9" className="py-md-2" tag="main">
				<PostCard post={postState} commentCount={comments.length}  voteDirection={myVotes.get(postState.uid)} sendVote={sendPostVote}/>
				{profile && <CommentInput post={postState} handleSuccess={handleComment} />}
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
					<CommentCard key={uid} node={node} post={postState} handleComment={handleComment} myVotes={myVotes} sendVote={sendCommentVote}/>
				))}
			</Col>
		</Layout>
	);
};

PostPage.getInitialProps = async context => {
	const res = await fetch(`${server}/api/posts/${context.query.id}`);
	const post: Post = await res.json();
	const initialComments: Comment[] = await (
		await fetch(`${server}/api/posts/${post.uid}/comments`)
	).json();
	return { post, initialComments };
};

export default PostPage;
