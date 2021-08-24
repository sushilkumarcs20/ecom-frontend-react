import React, { useState } from 'react';
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from 'react-router-dom';

import { addItemToCart, checkItemInCart, removeItemFromCart } from "./helper/cartHelper";

const isAuthenticated = true;

const Card = (props) => {
    const {
        currency = "₹",
        product,
        addedToCart = checkItemInCart(product),
        refreshParent = () => {}
    } = props;

    const cardTitle = product ? product.name : "Card Title";
    const cardDescription = product ? product.description : "Card Description";

    const [showAddToCart, setShowAddToCart] = useState(!addedToCart);
    const [showRemoveItemFromCart, setShowRemoveItemFromCart] = useState(addedToCart);
    const addToCartHandler = () => {
        if (isAuthenticated) {
            setShowAddToCart(false);
            setShowRemoveItemFromCart(true);
            addItemToCart(product, () => { });
            console.log('Added to Cart')
        } else {
            console.log("Login Please");
        }
    }

    const removeFromCartHandler = () => {
        if (isAuthenticated) {
            setShowAddToCart(true)
            setShowRemoveItemFromCart(false);
            removeItemFromCart(product, () => { });
            console.log('Removed from Cart');
            refreshParent();
        } else {
            console.log("Login Please");
        }
    }

    const getARedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }


    return (
        <div className="card" style={{ width: "100%" }}>
            <ImageHelper url={product.image} height={"25vh"} width={"100%"} />
            <div className="card-body">
                <h5 className="card-title text-muted">{cardTitle}</h5>
                <p className="card-text text-secondary">{cardDescription}</p>
                <p className="btn btn-success rounded btn-sm px-4">{currency} {product.price}</p>
                <div className="row">
                    {
                        showAddToCart &&
                        <div className="col-12">
                            <button className="btn-sm btn btn-outline-success w-100 my-2" onClick={() => { addToCartHandler() }}>
                                Add to Cart
                            </button>
                        </div>
                    }
                    {
                        showRemoveItemFromCart &&
                        <div className="col-12">
                            <button className="btn-sm btn btn-outline-danger my-2 w-100" onClick={() => { removeFromCartHandler() }}>
                                Remove from Cart
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Card
