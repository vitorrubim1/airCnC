import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//PAGES
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import New from './pages/New';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch> {/*APENAS UMA ROTA SEJA CHAMADA DE CADA VEZ*/}
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/new" component={New} />
            </Switch>
        </BrowserRouter>
    );
}