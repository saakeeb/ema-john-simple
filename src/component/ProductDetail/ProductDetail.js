import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState(null);


    //here we change localhost
    //sakib
    useEffect(()=>{
        fetch('https://arcane-scrubland-67183.herokuapp.com/product/'+productKey)
        .then(res=> res.json())
        .then(data=>{
            setProduct(data);
        })
    }, []);

    return (
        <div>
            <h1>Product Id: {productKey} details here</h1>
            {
                product && <Product showAddToCart={false} product={product}> </Product>
            }
        </div>
    );
};

export default ProductDetail;