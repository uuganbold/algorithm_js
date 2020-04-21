import { NextPage } from "next";
import Link from "next/link";
import User from '../../business/entities/User'
import fetch from 'isomorphic-unfetch';
import Layout from "../../components/layout/Layout";
import { server } from "../../config";

/**
 * This page shows information about single user.
 */
const UsersPage: NextPage<{ users: User[] }> = ({users}) => (
    <Layout>
        <h4 className="text-info">All Users.</h4>
        {users.map(user => (
            <div key={user.username}> <Link href='/u/[username]' as={'/u/'+user.username}><a>{user.username}</a></Link></div>
            )
         )}
    </Layout>
);

UsersPage.getInitialProps = async (context) => {
    //Reading user's information from the api. 
    //For the sake of good design, all network operations should be different layer, but so far it might be too much complexity
    //URI: http://[SERVER]/users/[username]
    const res = await fetch(`${server}/api/users`);
    const users: User[] = await res.json();
    return { users };
};


export default UsersPage;