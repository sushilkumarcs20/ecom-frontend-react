import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from "./index";

const PrivateRoutes = ({ component: Component, ...rest }) => {
    const [userVerified, setUserVerified] = useState(false);
    const [toRedirect, setToRedirect] = useState(false);
    
    useEffect(() => {
        isAuthenticated().then((data) => { setUserVerified(data); setToRedirect(!data) });
    }, [])

    const loader = () => {
        return (
            <div className=" justify-content-center align-items-center d-flex" style={{ height: "100vh" }}>
                <div className="spinner-border text-dark mx-2"></div> Loading...
            </div>
        )
    }
    return (

        <Route
            {...rest}
            render={props => {
                return (
                    userVerified ? <Component {...props} /> :
                        toRedirect ? <Redirect
                            to={{
                                pathname: "/signin",
                                state: { from: props.location }
                            }}
                        /> : loader()
                )
            }
            }
        />
    )
}

export default PrivateRoutes
