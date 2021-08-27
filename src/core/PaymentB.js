import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { emptyCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { getMeToken, processPayment } from "./helper/paymentHelper";
import { isAuthenticated, signout } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({
    currency = "₹",
    products,
    refreshParent = () => { },
}) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [userVerified, setUserVerified] = useState(false);
    const [toRedirect, setToRedirect] = useState(false);

    const getAmount = (products) => {
        let amount = 0;
        for (const product of products) {
            amount = amount + parseFloat(product.price);
        }
        return amount;
    }

    const getToken = (userId, token) => {
        getMeToken(userId, token)
            .then(info => {
                console.log(info)
                if (info.error) {
                    setInfo({
                        ...info,
                        error: info.error
                    });

                    signout(() => {
                        return <Redirect to="/" />;
                    });
                } else {
                    const clientToken = info.clientToken;
                    setInfo({
                        ...info,
                        clientToken: clientToken
                    })
                }
            })
    }

    useEffect(() => {
        isAuthenticated().then((data) => {
            if (data) {
                setUserVerified(true);
                setToRedirect(false);
                setUserId(data.user.id);
                setToken(data.token);
                if (data.user.id && data.token) {
                    getToken(data.user.id, data.token);
                }
            }
        });
    }, []);

    const loader = () => {
        return (
            <div className="justify-content-center align-items-center d-flex" style={{ height: "100%" }}>
                <div className="spinner-border text-dark mx-2"></div> Loading...
            </div>
        )
    }

    const onPurchase = () => {
        setInfo({
            ...info,
            loading: true
        });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount(products)
                };
                processPayment(userId, token, paymentData)
                    .then(response => {
                        if (response.error) {
                            console.log("PAYMENT FAILED");
                            signout(() => {
                                return <Redirect to="/" />
                            })
                        } else {
                            setInfo({
                                ...info,
                                success: response.success,
                                loading: false,
                            });
                            console.log("PAYMENT SUCCESS");
                            let product_names = "";
                            products.forEach(product => {
                                product_names += product.name + ",";
                            });

                            const orderData = {
                                products: product_names,
                                transaction_id: response.transaction.id,
                                amount: response.transaction.amount
                            }

                            createOrder(userId, token, orderData)
                                .then(orderResponse => {
                                    if (orderResponse.error) {
                                        console.log("Order Failed");
                                        console.log(orderResponse?.msg);
                                        signout(() => {
                                            return <Redirect to="/" />
                                        })
                                    } else {
                                        if (orderResponse.success) {
                                            setInfo({
                                                ...info,
                                                success: true,
                                                loading: false,
                                            });
                                            console.log("Order Placed- from manual console");
                                            console.log(orderResponse?.msg, "-from response");
                                            emptyCart();
                                            refreshParent("Order Successfully Placed");
                                        }
                                    }
                                })
                                .catch(error => {
                                    setInfo({
                                        ...info,
                                        success: false,
                                        loading: false,
                                    });
                                    console.log("Order Failed", error)
                                })
                        }
                    })
                    .catch(error => {
                        setInfo({
                            ...info,
                            success: false,
                            loading: false,
                        });
                        console.log("Order Failed", error)
                    })
            })
            .catch(error => {
                setInfo({
                    ...info,
                    success: false,
                    loading: false,
                });
                console.log("Nonce", error)
            })
    }

    const showBtnDropIn = () => {
        return (
            <>
                {
                    info.clientToken === null ?
                        (<h3>Please <Link to="/signin" className="text-white">login</Link> to proceed further</h3>) :
                        products.length > 0 ?
                            (
                                <div>
                                    <DropIn
                                        options={{ authorization: info.clientToken }}
                                        onInstance={(instance) => (info.instance = instance)}
                                    >
                                    </DropIn>
                                    <button onClick={onPurchase} className="btn btn-info text-white w-100">Buy Now</button>
                                </div>
                            ) :
                            (
                                <h3>Please add something in cart</h3>
                            )
                }
            </>
        )
    }

    return (
        <div>
            {info.loading && loader()}
            <h3>Your Bill is: {currency} {getAmount(products)}</h3>
            {showBtnDropIn()}
        </div>
    )
}

export default PaymentB
