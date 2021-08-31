import React, { useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isLocallyAuthenticated } from "./../auth/helper";
import "./Menu.css";

import checkoutCartIcon from "./../assets/images/checkoutCart-32.png";
import { useCart } from './helper/cartHelper';

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return "page";
    } else {
        return false;
    }
}

const Menu = ({ history, path }) => {
    const {cartState} = useCart();
    const [user, setUser] = useState({ logged: false, data: {} })
    
    useEffect(() => {
        const getUser = isLocallyAuthenticated();
        if (getUser) {
            setUser({ ...user, logged: true, data: getUser })
        }
    }, []);

    return (
        <>
            <nav className="fixed-top navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        Home
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {user.logged &&
                                <li className="nav-item">
                                    <Link aria-current={currentTab(history, "/user/dashboard")} to="/user/dashboard" className={currentTab(history, "/user/dashboard") ? `active nav-link` : 'nav-link'}>
                                        Dashboard
                                    </Link>
                                </li>
                            }
                        </ul>
                        <ul className="navbar-nav ml-lg-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-3 checkoutCartIconParent">
                                <Link aria-current={currentTab(history, "/cart")} to="/cart" className={currentTab(history, "/cart") ? `active nav-link` : 'nav-link'}>
                                    <img className="checkoutCartIcon" src={checkoutCartIcon} alt="checkout" title="Go to Cart" />
                                    <span className="cartItemCount">{cartState.count}</span>
                                </Link>
                            </li>
                            {!user.logged &&
                                <>
                                    <li className="nav-item">
                                        <Link aria-current={currentTab(history, "/signup")} to="/signup" className={currentTab(history, "/signup") ? `active nav-link` : 'nav-link'}>
                                            Register
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link aria-current={currentTab(history, "/signin")} to="/signin" className={currentTab(history, "/signin") ? `active nav-link` : 'nav-link'}>
                                            Login
                                        </Link>
                                    </li>
                                </>
                            }
                            {user.logged &&
                                <li className="signoutBtn nav-item">
                                    <span
                                        className="btn nav-link rounded"
                                        onClick={() => {
                                            signout(() => {
                                                history.push("/");
                                            }); setUser({ ...user, logged: false });
                                        }}
                                    >
                                        Logout
                                    </span>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="mb-5"></div>
        </>
    )
}

export default withRouter(Menu)
