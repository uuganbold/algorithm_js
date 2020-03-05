import React, { useState, FunctionComponent } from 'react';
import Header from './Header'

type Props={}
const Layout: FunctionComponent<Props>=({children})=> {
    return (
          <div>
              <Header/>
              {children}
          </div>
    );
}

export default Layout;