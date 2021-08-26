import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Cart from "./core/Cart";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashboard from "./user/UserDashboard";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <PrivateRoutes exact path="/user/dashboard" component={UserDashboard} />
            </Switch>
        </Router>
    )
}

export default Routes;
