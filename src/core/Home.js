import React, { useEffect, useState } from 'react';
import { getProducts } from "./helper/coreapicalls";
import Base from "./Base";
import '../styles.css';
import Card from './Card';
import { Link } from 'react-router-dom';

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
            <div className="home-banner jumbotron" style={{ background: "rgb(80, 92, 97)" }}>
                <div className="container pb-1">
                    <h1 className="display-3">Banner Area</h1>
                    <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                    <p>
                        <Link className="btn btn-primary btn-lg disabled" to="#" role="button">Learn more »</Link>
                    </p>
                </div>
            </div>

            <hr />
            <h1 className="m-3 text-white-50">Products</h1>
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
