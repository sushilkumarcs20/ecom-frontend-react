import React, { useEffect, useState } from 'react';
import { getProducts } from "./helper/coreapicalls";
import Base from "./Base";
import '../styles.css';
import Card from './Card';

function Home(props) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    console.log(error);
                } else {
                    setProducts(data);
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadAllProducts();
    }, []);
    return (
        <Base title="Home Page" description="Welcome to Tshirt Store">
            <h1 className="mb-5 text-white-50">Home Component</h1>
            <div className="row">
                {
                    products.map((product) => {
                        return (
                            <div key={product.id} className="col-3 mb-4">
                                <Card product={product} />
                            </div>
                        );
                    })
                }
            </div>
        </Base>
    )
}

export default Home
