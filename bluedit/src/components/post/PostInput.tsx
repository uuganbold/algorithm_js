import { Form, FormGroup, Input, Dropdown, Button, CardBody, Card, FormFeedback, FormText } from "reactstrap";
import SearchSelect from "./SearchSelect";
import { ChangeEvent, useState, FunctionComponent, FormEvent, useContext } from "react";
import Subbluedit from "../../business/entities/Subbluedit";
import UserContext from "../context/UserContext";
import Post from "../../business/entities/Post";
import fetch from 'isomorphic-unfetch'

type Props={
    initialSubdit?:Subbluedit;
    handleSuccessPost:(p:Post)=>void;
    handleChangeSubdit?:(subdit:Subbluedit)=>void;
}

const style={
    backgroundColor:"rgb(247,247,247)"
}

const PostInput:FunctionComponent<Props>=({initialSubdit,handleSuccessPost,handleChangeSubdit})=>{

    const [subdits,setSubdits]=useState([]);
    const [subdit,setCommunity]=useState(initialSubdit);
    const [title,setTitle]=useState('');
    const [text,setText]=useState('');
    const [subditInvalid,setSubditInvalid]=useState(false);
    const [titleInvalid,setTitleInvalid]=useState(false);

    const {token,profile}=useContext(UserContext)

    const handleCommunityChange=async (query:string)=>{
          const response=await fetch('/api/subbluedits?q='+query);
          const subbluedits:Subbluedit[]=await response.json();
          setSubditInvalid(false);
          setSubdits(subbluedits.map((s)=>({key:s.uid,name:s.name,value:s})));
    }
    const handleCommunitySelect=(choice:any)=>{
        setCommunity(choice as Subbluedit)
        if(handleChangeSubdit){
            handleChangeSubdit(choice as Subbluedit);
        }
    }

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        switch (e.target.name) {
            case 'title':
                setTitle(e.target.value);
                setTitleInvalid(false);
                break;
            case 'text':
                setText(e.target.value);
                break;
        }
    }

    const validateForm=():boolean=>{
        let valid=true;
        if(subdit==null){
            valid=false;
            setSubditInvalid(true);
        }
        if(title==null||title.length==0){
            valid=false;
            setTitleInvalid(true);
        }
        return valid;
    }
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!validateForm()) return;
        const post={post:{name:title,text:text},subbluedit:subdit.uid}
        fetch('/api/posts',{
            method:'POST',
            headers:{
                'Authorization':token
            },
            body:JSON.stringify(post)
        }).then(async response=>{
            return response.json();
        }).then(p=>{
            handleSuccessPost(p);
            formClear();
        });
    }

    const formClear=()=>{
        setTitle('');
        setText('');
    }
    
    return (
        <Card style={style}>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <SearchSelect invalid={subditInvalid} inValidText='Oh noes! You need to choose a Subbluedit.' placeholder={'Choose your community'} initialQuery={subdit==null?'':subdit.name} handleQueryChange={handleCommunityChange} choices={subdits} handleSelect={handleCommunitySelect}/>
                    </FormGroup>
                    <FormGroup>
                        <Input invalid={titleInvalid} placeholder='Title' name='title' value={title} onChange={handleChange} autoComplete="off"/>
                        <FormFeedback>Oh noes! You need to input title for the post.</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input type='textarea' name='text' value={text} placeholder='Text (Optional)' onChange={handleChange}/>
                    </FormGroup>
                    <Button color='primary'>POST</Button>
                </Form>
            </CardBody>
        </Card>
        
    )
}

export default PostInput;