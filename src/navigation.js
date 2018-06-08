import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '@/utils/asyncComponent';

const home = asyncComponent( () => import('@/pages/home') );
const buttons = asyncComponent( () => import('@/pages/button') );
const switchs = asyncComponent( () => import('@/pages/switch') );
const carousels = asyncComponent( () => import('@/pages/carousel') );
const modals = asyncComponent( () => import('@/pages/modal') );
const toasts = asyncComponent( () => import('@/pages/toast') );

export default class Navigation extends Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/" exact strict component={home} />
          <Route path="/buttons" exact strict component={buttons} />
          <Route path="/switchs" exact strict component={switchs} />
          <Route path="/carousels" exact strict component={carousels} />
          <Route path="/modals" exact strict component={modals} />
          <Route path="/toasts" exact strict component={toasts} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

