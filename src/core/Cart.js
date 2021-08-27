import React, { useEffect, useState } from 'react';
import Base from "./Base";
import '../styles.css';
import Card from './Card';
import { getItemsFromCart, checkItemInCart, emptyCart } from "./helper/cartHelper";
import PaymentB from './PaymentB';

const Cart = (props) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        setProducts(getItemsFromCart());
    }

    const loadProductSection = () => {
        return (
            <div className="row">
                <h1 className="container-fluid text-center">Products</h1>
                {
                    products.length > 0 ?
                        products.map((product) => {
                            return checkItemInCart(product) ? (
                                <div key={product.id} className="col-lg-6 col mb-4">
                                    <Card addedToCart={true} refreshParent={() => loadAllProducts()} product={product} />
                                </div>
                            ) : null;
                        }) :
                        <h5 className="container-fluid text-warning text-center">Your Cart is Empty</h5>
                }
            </div>
        );
    }

    const loadCheckoutSection = () => {
        return (
            <div>
                <h1 className="container-fluid text-center">Checkout</h1>
                {products.length > 0 ?
                    (
                        <PaymentB products={products} refreshParent={(msg) => {loadAllProducts(); alert(msg)}} />
                    ) :
                    (
                        <h5 className="container-fluid text-warning text-center">Please add items to cart.</h5>
                    )}
            </div>
        )
    }

    useEffect(() => {
        loadAllProducts();
    }, []);
    return (
        <Base title="Your Cart" description="All the items you added are here">
            <div className="row">
                <h1 className="col mb-5 text-white-50">Cart Component</h1>
                <div className="col">
                    <div style={{ float: "right" }}>
                        <button onClick={() => { emptyCart(() => { }); setProducts([]) }} className="btn btn-danger">Empty Cart</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    {loadProductSection()}
                </div>
                <div className="col-6">
                    {loadCheckoutSection()}
                </div>
            </div>
        </Base>
    )
}

export default Cart
