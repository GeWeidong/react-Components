import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '@/utils/asyncComponent';

const home = asyncComponent( () => import('@/pages/home') );
const buttons = asyncComponent( () => import('@/pages/button') );

export default class Navigation extends Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/" exact strict component={home} />
          <Route path="/buttons" exact strict component={buttons} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

