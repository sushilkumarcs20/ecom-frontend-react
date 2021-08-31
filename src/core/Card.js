import React, { useContext, useState } from 'react';

import ImageHelper from "./helper/ImageHelper";
import { Link, Redirect } from 'react-router-dom';

import { addItemToCart, checkItemInCart, removeItemFromCart, useCart } from "./helper/cartHelper";
import addToCartIcon from "./../assets/images/addToCart-32.png";
import removeFromCartIcon from "./../assets/images/removeFromCart-32.png";
import checkoutCartIcon from "./../assets/images/checkoutCart-32.png";

import "./Card.css"
import CardModal from './CardModal';

const Card = (props) => {
    const {
        currency = "₹",
        product,
        addedToCart = checkItemInCart(product),
        refreshParent = () => { },
        isThisCart = false
    } = props;

    const { cartDispatch } = useCart();

    const cardTitle = product ? product.name : "Card Title";
    const cardDescription = product ? product.description : "Card Description";

    const [hover, setHover] = useState(false);

    const [showAddToCart, setShowAddToCart] = useState(!addedToCart);
    const [showModal, setShowModal] = useState(false);
    const [showRemoveItemFromCart, setShowRemoveItemFromCart] = useState(addedToCart);
    const addToCartHandler = () => {
        setShowAddToCart(false);
        setShowRemoveItemFromCart(true);
        addItemToCart(product, () => { });
        cartDispatch({ type: 'refreshCartData' });
        console.log('Added to Cart')
    }

    const removeFromCartHandler = () => {
        setShowAddToCart(true)
        setShowRemoveItemFromCart(false);
        removeItemFromCart(product, () => { });
        console.log('Removed from Cart');
        cartDispatch({ type: 'refreshCartData' });
        refreshParent();
    }

    const getARedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const modalDiv = () => {
        return (
            <div class="modal fade show" id="myCardModal" tabindex="-1" aria-labelledby="myCardModalTitle" aria-modal="true" role="dialog" style={{ display: "block" }}>
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="myCardModalTitle">{cardTitle}</h5>
                            <button onClick={() => setShowModal(false)} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <ImageHelper url={product.image} height={"25vh"} width={"100%"} cursor={"pointer"} clickEvent={() => { setShowModal(true) }} />
                                </div>
                                <div className="col-12">
                                    <p>{cardDescription}</p>
                                </div>
                                <div className="col-6">
                                    <div className="btn btn-success rounded btn-sm px-4 mb-0">{currency} {product.price}</div>
                                </div>
                                <div className="col-6">
                                    <div className="row px-4">
                                        {
                                            showAddToCart &&
                                            <div className="offset-6 col-6 mb-0">
                                                <img style={{ cursor: "pointer" }} className="addToCartIcon" onClick={() => { addToCartHandler() }} src={addToCartIcon} alt="addToCart" title="Add Item" />
                                            </div>
                                        }
                                        {
                                            showRemoveItemFromCart &&
                                            <>
                                                {
                                                    !isThisCart &&
                                                    <div className="col-6 mb-0">
                                                        <Link to="/cart">
                                                            <img style={{ cursor: "pointer" }} className="checkoutCartIcon" src={checkoutCartIcon} alt="checkout" title="Go to Cart" />
                                                        </Link>
                                                    </div>
                                                }
                                                <div className={isThisCart ? "offset-6 col-6 mb-0" : "col-6 mb-0"}>
                                                    <img style={{ cursor: "pointer" }} className="removeFromCartIcon" onClick={() => { removeFromCartHandler() }} src={removeFromCartIcon} alt="removeFromCart" title="Remove Item" />
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }


    return (
        <>
            <div onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }} className="card" style={{ width: "100%" }}>
                <ImageHelper url={product.image} height={"25vh"} width={"100%"} cursor={"pointer"} clickEvent={() => { setShowModal(true) }} />
                <div className="card-body">
                    <h5 className="card-title text-muted">{cardTitle}</h5>
                    <p className="card-text text-secondary">{cardDescription}</p>
                    <div className="row">
                        <div className="col-6">
                            <div className="btn btn-success rounded btn-sm px-4 mb-0">{currency} {product.price}</div>
                        </div>
                        <div className="col-6">
                            <div className="row px-4">
                                {
                                    hover && showAddToCart &&
                                    <div className="offset-6 col-6 mb-0">
                                        <img style={{ cursor: "pointer" }} className="addToCartIcon" onClick={() => { addToCartHandler() }} src={addToCartIcon} alt="addToCart" title="Add Item" />
                                    </div>
                                }
                                {
                                    showRemoveItemFromCart &&
                                    <>
                                        {
                                            !isThisCart &&
                                            <div className="col-6 mb-0">
                                                <Link to="/cart">
                                                    <img style={{ cursor: "pointer" }} className="checkoutCartIcon" src={checkoutCartIcon} alt="checkout" title="Go to Cart" />
                                                </Link>
                                            </div>
                                        }
                                        <div className={isThisCart ? "offset-6 col-6 mb-0" : "col-6 mb-0"}>
                                            <img style={{ cursor: "pointer" }} className="removeFromCartIcon" onClick={() => { removeFromCartHandler() }} src={removeFromCartIcon} alt="removeFromCart" title="Remove Item" />
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showModal &&
                <CardModal>{modalDiv()}</CardModal>
            }
        </>
    )
}

export default Card
