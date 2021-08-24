import React, { useEffect, useState } from 'react';
import Base from "./Base";
import '../styles.css';
import Card from './Card';
import { getItemsFromCart, removeItemFromCart, emptyCart } from "./helper/cartHelper";

function Cart(props) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        setProducts(getItemsFromCart());
    }

    useEffect(() => {
        loadAllProducts();
    }, []);
    return (
        <Base title="Your Cart" description="All the items in you added are here">
            <h1 className="mb-5 text-white-50">Cart Component</h1>
            <div className="row">
                {
                    products.length > 0 ?
                        products.map((product) => {
                            return (
                                <div key={product.id} className="col-3 mb-4">
                                    <Card product={product} />
                                </div>
                            );
                        }) :
                        <h6 className="container-fluid text-center text-warning display-6">Your Cart is Empty</h6>
                }
            </div>
        </Base>
    )
}

export default Cart
