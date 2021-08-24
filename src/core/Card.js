import React from 'react';
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product, addToCard = true, removeFromCart = false }) => {
    return (
        <div className="card" style={{ width: "100%" }}>
            <ImageHelper url={product.image} height={"25vh"} width={"100%"} />
            <div className="card-body">
                <h5 className="card-title text-muted">{product.name}</h5>
                <p className="card-text text-secondary">{product.description}</p>
                <p className="btn btn-success rounded btn-sm px-4">₹ {product.price}</p>
                <div className="row">
                    <div className="col-6">
                        <button style={{ fontSize: 12 }} className="btn-sm btn btn-outline-success w-100 my-2" onClick={() => { }}>
                            Add to Cart
                        </button>
                    </div>
                    <div className="col-6">
                        <button style={{ fontSize: 12 }} className="btn-sm btn btn-outline-danger my-2 w-100" onClick={() => { }}>
                            Remove from Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
