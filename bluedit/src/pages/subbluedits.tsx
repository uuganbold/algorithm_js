import { NextPage } from 'next';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/layout/Layout';
import Subbluedit from '../business/entities/Subbluedit';
import { Col, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSProperties } from 'react';
import { server } from '../config';

const style={
    toolbar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end'
    } as CSSProperties
}
/**
 * This page shows information about single user.
 */
const SubblueditPage: NextPage<{ subdits: Subbluedit[] }> = ({ subdits }) => (
	<Layout>
		<Col sm="9" md="6" className="py-md-2" tag="main">
            <h3>Today's Top Growing Communities</h3>
            <div style={style.toolbar}>
                <Link href="/r/new">
					<a>New Subbluedit</a>
				</Link>               
            </div>	

            <ListGroup>
            {subdits.map(subdit => (
                <ListGroupItem key={subdit.uid}>
                    <Link href="/r/[name]" as={'/r/' + subdit.name}>
						<a>{subdit.name}</a>
					</Link>
                </ListGroupItem>
			))} 
            </ListGroup>
		</Col>
	</Layout>
);

SubblueditPage.getInitialProps = async context => {
	//Reading user's information from the api.
	//For the sake of good design, all network operations should be different layer, but so far it might be too much complexity
	//URI: http://[SERVER]/subbluedits/[username]
	const res = await fetch(`${server}/api/subbluedits`);
	const subdits: Subbluedit[] = await res.json();
	return { subdits: subdits };
};

export default SubblueditPage;
