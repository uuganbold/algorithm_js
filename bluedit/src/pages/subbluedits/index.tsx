import { NextPage } from "next";
import Link from "next/link";
import fetch from 'isomorphic-unfetch';
import Layout from "../../components/Layout";
import Subbluedit from "../../business/entities/Subbluedit";

/**
 * This page shows information about single user.
 */
const SubblueditPage: NextPage<{ subdits: Subbluedit[] }> = ({subdits}) => (

    <Layout>
        <h4 className="text-info">All Subbludits.</h4>
        {subdits.map(subdit => (
            <div key={subdit.uid}> <Link href='/subbluedits/[name]' as={'/subbluedits/'+subdit.name}><a>{subdit.name}</a></Link></div>
            )
         )}
         <div>
             <Link href='/subbluedits/new'><a>New Subbluedit</a></Link>
         </div>
    </Layout>
);

SubblueditPage.getInitialProps = async (context) => {
    //Reading user's information from the api. 
    //For the sake of good design, all network operations should be different layer, but so far it might be too much complexity
    //URI: http://[SERVER]/subbluedits/[username]
    const res = await fetch(`http://localhost:3000/api/subbluedits`);
    const subdits: Subbluedit[] = await res.json();
    return { subdits: subdits };
};


export default SubblueditPage;