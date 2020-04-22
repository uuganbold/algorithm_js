import { NextPage } from "next";
import User from '../../business/entities/User'
import fetch from 'isomorphic-unfetch';
import Layout from "../../components/layout/Layout";
import { Col } from "reactstrap";
import { server } from "../../config";

/**
 * This page shows information about single user.
 */
const UserPage: NextPage<{ user: User }> = ({ user }) => (
    
        <Layout>
          <Col sm="9" md="6" className="py-md-2" tag="main"> 
            <h4 className="text-primary">User Details Page</h4>
            <div> <b className="text-dark">Username : </b> <p className="text-dark">{user.username}</p></div>
          
            <div> <b className="text-dark">Bio : </b> <p className="text-dark"> {user.bio} </p></div>
          </Col>
        
        </Layout>
        

  );
  
UserPage.getInitialProps = async (context) => {
    //Reading user's information from the api. 
    //For the sake of good design, all network operations should be different layer, but so far it might be too much complexity
    //URI: http://[SERVER]/users/[username]
    const res=await fetch(`${server}/api/users/${context.query.username}`);
    const user:User=await res.json();
    return { user };
  };


export default UserPage;