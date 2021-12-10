import React from 'react';
import { Route, Switch } from 'wouter';

import { Navbar } from './Navbar';
import { Menu } from './Menu';
import { SourceCode } from './SourceCode';
import { AccordionSidebar } from './examples/AccordionSidebar';
import AccordionSidebarCode from './examples/AccordionSidebar.json';
import { FlatSidebar } from './examples/FlatSidebar';
import FlatExampleCode from './examples/FlatSidebar.json';
import { NestedSidebar } from './examples/NestedSidebar';
import NestedSidebarCode from './examples/NestedSidebar.json';
import { TopMenu } from './examples/TopMenu';
import TopMenuCode from './examples/TopMenu.json';
import { TopMenuHorizontal } from './examples/TopMenuHorizontal';
import TopMenuHorizontalCode from './examples/TopMenuHorizontal.json';
import { PerformancePage } from './examples/PerformancePage';
import { Documentation } from './Documentation';
import { Examples } from './Examples';
import { Api } from './Api';

const App = () => {
  return (
    <div className='row site'>
      <div className='md-12 col'>
        <Route path={'/examples/:id'}>
          <div style={{ position: 'fixed', top: 80, right: 0 }}>
            <Menu />
          </div>
        </Route>
        <div className='row'>
          <Navbar />
          <Switch>
            <Route path='/examples'>
              <Examples />
            </Route>
            <Route path='/examples/sidebar'>
              <FlatSidebar />
              <SourceCode content={FlatExampleCode.content} />
            </Route>
            <Route path='/examples/nested_sidebar'>
              <NestedSidebar />
              <SourceCode content={NestedSidebarCode.content} />
            </Route>
            <Route path='/examples/accordion'>
              <AccordionSidebar />
              <SourceCode content={AccordionSidebarCode.content} />
            </Route>
            <Route path='/examples/topmenu'>
              <TopMenu />
              <SourceCode content={TopMenuCode.content} />
            </Route>
            <Route path='/examples/topmenu_horizontal'>
              <TopMenuHorizontal />
              <SourceCode content={TopMenuHorizontalCode.content} />
            </Route>
            <Route path='/examples/performance'>
              <PerformancePage />
            </Route>
            <Route path='/documentation'>
              <Documentation />
            </Route>
            <Route path='/api'>
              <Api />
            </Route>
            <Route path=''>
              <Documentation />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default App;
