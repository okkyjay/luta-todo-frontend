import React, { Component } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "../home";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Todo from "../todo/todo";


const routes = [

    {path: '/home', extact: true, component: Home, key:2},
    {path: '/login', extact: true, component: Login, key:3},
    {path: '/register', extact: true, component: Register, key:4},
    {path: '/todos', extact: true, component: Todo, key:5},
    {path: '/', extact: true, component: Home, key:1},
]
class AppRoutes extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    {routes.map( route => <Route key={route.key} path={route.path} extact={route.extact} component={route.component}/> )}
                </Switch>
            </BrowserRouter>
        )
    }
}
export default AppRoutes