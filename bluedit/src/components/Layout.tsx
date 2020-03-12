import React, { useState, FunctionComponent, useContext } from 'react';
import Header from './Header'
import { Container, Row, Alert } from 'reactstrap';
import UserContext from './UserContext';

type Props={}
const Layout: FunctionComponent<Props>=({children})=> {
    const {errors}=useContext(UserContext);

    return (
          <div>
              <Header/>
              <Container fluid>
                {errors&&(
                        <Row><Alert color="danger">{errors}</Alert></Row>
                )}
                 <Row className='flex-xl-nowrap d-flex justify-content-center'>
                        {children}
                 </Row>
              </Container>
            </div>
              
    );
}

export default Layout;