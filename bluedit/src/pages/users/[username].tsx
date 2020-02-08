import { NextPage } from "next";
import User from '../../business/entities/User'
import fetch from 'isomorphic-unfetch';



/**
 * This page shows information about single user.
 */
const UserPage: NextPage<{ user: User }> = ({ user }) => (
    <div>
        <div>{user.username}</div>
        <div>{user.email}</div>
        <div>{user.password}</div>
        <div>{user.bio}</div>

    </div>
  );
  
UserPage.getInitialProps = async (context) => {
    //Reading user's information from the api. 
    //For the sake of good design, all network operations should be different layer, but so far it might be too much complexity
    //URI: http://[SERVER]/users/[username]
    const res=await fetch(`http://localhost:3000/api/users/${context.query.username}`);
    const user:User=await res.json();
    return { user };
  };


export default UserPage;