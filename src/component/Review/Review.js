import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
// import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
// import happyImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';
import './Review.css';

const Review = () => {
    const [cart, setCart]=useState([]);
    // const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();

    // const handlePlaceOrder = () => {
    //     setCart([]);
    //     setOrderPlaced(true);
    //     processOrder ();
    // } 
    
    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect (()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        console.log(productKeys);
        fetch('https://arcane-scrubland-67183.herokuapp.com/getProductsByKey', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(productKeys)
            })
        .then(res=>res.json())
        .then(data=> {
            const cartProducts =productKeys.map( key => {
                const product = data.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            });
            setCart(cartProducts);
        })
         
    }, [])

    // let thankyou;
    // if(orderPlaced){
    //     thankyou = <img src={happyImage} alt=""/>
    // }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem 
                    key={pd.key}
                    removeProduct = {removeProduct}
                    product={pd}></ReviewItem>)
                }
                {/* { thankyou } */}
                {
                    !cart.length && <h1>Your Cart is Empty. <a href="/">Keep Shopping</a></h1>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="shipment">
                        {
                            auth.user ?
                            <button className="main-button">Proceed to Shipment</button>
                            : <button className="main-button">Login to Proceed</button>
                        }
                    </Link>
                    
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;