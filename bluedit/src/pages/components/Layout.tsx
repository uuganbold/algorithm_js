import React, { useState, FunctionComponent } from 'react';
import Header from './Header'
import { Container, Row } from 'reactstrap';

type Props={}
const Layout: FunctionComponent<Props>=({children})=> {
    return (
          <div>
              <Header/>
              <Container fluid>
                 <Row className='flex-xl-nowrap d-flex justify-content-center'>
                        {children}
                 </Row>
              </Container>
            </div>
              
    );
}

export default Layout;