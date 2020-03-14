import React, { useState, FunctionComponent, useContext } from 'react';
import Header from '../header/Header'
import { Container, Row, Alert, Col } from 'reactstrap';
import UserContext from '../context/UserContext';
import Canvas from './Canvas';

type Props={}
const Layout: FunctionComponent<Props>=({children})=> {
    const {errors}=useContext(UserContext);

    return (
          <div>
              <Header/>
              <Canvas/>
              <Container fluid>
                {errors&&(
                        <Row className='flex-xl-nowrap d-flex justify-content-center'>
                          <Col sm="9" md="6" className="py-md-2">
                            <Alert color="danger">{errors.message}</Alert>
                          </Col>
                        </Row>
                )}
                 <Row className='flex-xl-nowrap d-flex justify-content-center'>
                        {children}
                 </Row>
              </Container>
            </div>
              
    );
}

export default Layout;