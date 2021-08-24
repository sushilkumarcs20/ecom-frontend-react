import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cart from "./core/Cart";
import Home from "./core/Home";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/" component={Cart} />
            </Switch>
        </Router>
    )
}

export default Routes;
