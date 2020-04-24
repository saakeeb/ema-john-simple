import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Product = (props) => {
    console.log(props.product);
    const { name, img, seller,price, stock, key} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <h4> <Link to={"/product/"+key}>{name}</Link> </h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only <span className="product-stock">{stock}</span>  left in store. Order Soon</small></p>
                {props.showAddToCart &&  <button className="product-cart" 
                    onClick={()=>props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                </button>}
            </div>

        </div>
    );
};

export default Product;