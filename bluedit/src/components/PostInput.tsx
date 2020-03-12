import { Form, FormGroup, Input, Dropdown, Button } from "reactstrap";
import SearchSelect from "./SearchSelect";
import { ChangeEvent, useState, FunctionComponent, FormEvent, useContext } from "react";
import Subbluedit from "../business/entities/Subbluedit";
import UserContext from "./UserContext";
import Post from "../business/entities/Post";

type Props={
    initialSubdit?:Subbluedit;
    handleSuccessPost:(p:Post)=>void;
}

const PostInput:FunctionComponent<Props>=({initialSubdit,handleSuccessPost})=>{

    const [subdits,setSubdits]=useState([]);
    const [subdit,setCommunity]=useState(initialSubdit);
    const [title,setTitle]=useState('');
    const [text,setText]=useState('');

    const {token,profile}=useContext(UserContext)

    const handleCommunityChange=async (query:string)=>{
          const response=await fetch('/api/subbluedits?q='+query);
          const subbluedits:Subbluedit[]=await response.json();
          setSubdits(subbluedits.map((s)=>({key:s.uid,name:s.name,value:s})));
    }
    const handleCommunitySelect=(choice:any)=>{
        setCommunity(choice as Subbluedit)
    }

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        switch (e.target.name) {
            case 'title':
                setTitle(e.target.value);
                break;
            case 'text':
                setText(e.target.value);
                break;
        }
    }

    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
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
        });
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <SearchSelect initialQuery={subdit.name} handleQueryChange={handleCommunityChange} choices={subdits} handleSelect={handleCommunitySelect}/>
            </FormGroup>
            <FormGroup>
                <Input placeholder='Title' name='title' onChange={handleChange}/> 
            </FormGroup>
            <FormGroup>
                <Input type='textarea' name='text' placeholder='Text (Optional)' onChange={handleChange}/>
            </FormGroup>
            <Button color='primary'>POST</Button>
        </Form>
    )
}

export default PostInput;