import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getOrders } from './helper/coreapicalls'
import Base from "./Base"
import Card from "./Card"

const Orders = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllOrders = () => {
        getOrders()
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    console.log(error);
                } else {
                    setProducts(data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        loadAllOrders();
    }, []);
    return (
        <Base title="Orders" description="Check all the orders here">

            <h1 className="m-3 text-white-50">Orders</h1>
            <hr />
            <div className="row">
                <ul class="list-group">
                    {
                        products.map((product) => {
                            let orderDate = new Date(product.created_at);
                            return (
                                <li class="list-group-item">
                                    <p>
                                        Total Amount: {product.total_amount} <br />
                                        Total Products: {product.total_products} <br />
                                        Products: {product.product_names} <br />
                                        Ordered On: {orderDate.toLocaleDateString()}
                                    </p>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </Base>
    )
}

export default Orders
