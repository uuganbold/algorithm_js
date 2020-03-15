import { FunctionComponent, useContext, useState, ChangeEvent, FormEvent } from "react";
import UserContext from "../context/UserContext";
import { Form, FormGroup, Input, FormFeedback, Button } from "reactstrap";
import Link from "next/link";
import Post from "../../business/entities/Post";
import Comment from "../../business/entities/Comment"

const CommentInput:FunctionComponent<{post:Post, parent?:Comment, handleSuccess:(comment:Comment)=>void}>=({post,parent,handleSuccess})=>{
    const {token,profile,setErrors}=useContext(UserContext);
    const [comment,setComment]=useState('');
    const [invalid,setInvalid]=useState(false);

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
         if(e.target.name=='comment'){
             if(e.target.value.length==0){
                 setInvalid(true);
             }else setInvalid(false);
             setComment(e.target.value);
         }
    }

    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!invalid){
            //@ts-ignore
            const com:Comment={text:comment,postid:post.uid}
            if(parent!=null) com['parentid']=parent.uid; 

            fetch(`/api/posts/${post.uid}/comments`,{
                method:'POST',
                headers:{
                    authorization:token
                },
                body:JSON.stringify(com)
            }).then(async response=>{
                return response.json();
            }).then(c=>{
                handleSuccess(c);
                setComment('');
            }).catch(e=>setErrors(e))
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <div>Comment as <Link href={`/u/[username]`} as={`/u/${profile.username}`}><a>{profile.username}</a></Link></div>
            <FormGroup>
                <Input type="textarea" name="comment" value={comment} onChange={handleChange} invalid={invalid}/>
                <FormFeedback>Please input your comment</FormFeedback>
                <Button>COMMENT</Button>
            </FormGroup>
        </Form>
    )
}

export default CommentInput;