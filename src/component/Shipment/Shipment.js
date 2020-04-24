import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { getDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [shipInfo, setShipInfo] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const auth = useAuth();
  
  

  const stripePromise = loadStripe('pk_test_WYn9PpfvYEwQtOrfdkekvWJQ00mBz5KBYY');

  const onSubmit = data => {
    setShipInfo(data);
    //TODO : Sakib move this after payment
    // console.log(auth.user.email);
    
  }

  const handlePlaceOrder = (payment) =>{
    const savedCart = getDatabaseCart();
    const orderDetails = {
      email: auth.user.email,
      cart: savedCart,
      shipment: shipInfo,
      payment: payment
    };

    fetch('http://localhost:3000/placeOrder', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(order => {
        setOrderId(order._id)
        clearLocalShoppingCart();
        // console.log('Order Placed', data);
        
        // alert('Successfully placed your order with order id: ' + order._id)
        // processOrder();

        //clear localStorage  cart
        //give thanks to the user
      })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6" style={{display: shipInfo && 'none'}}>
          <h3>Shipment Information</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="ship-form">

            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder='Your Name' />
            {
              errors.name && <span className="error">Your name is required</span>
            }
            <br />
            <select name="gender" ref={register({ required: true })} style={{ marginLeft: '15px', marginTop: '18px', borderRadius: '4px' }}>
              <option value="sex">Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <span className="error">Select your gender</span>}

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder='Your Email' />
            {
              errors.email && <span className="error">Your email is required</span>
            }

            <input name="addressLine1" ref={register({ required: true })} placeholder='Your Address' />
            {errors.addressLine1 && <span className="error">Address is required</span>}

            <input name="addressLine2" ref={register} placeholder='Your Address' />

            <input name="city" ref={register({ required: true })} placeholder='Your City' />
            {errors.city && <span className="error">City is required</span>}

            <input name="country" ref={register({ required: true })} placeholder='Your Country' />
            {errors.country && <span className="error">Country is required</span>}

            <input name="mobile" type="number" ref={register({ required: true })} placeholder='Your mobile number' />
            {errors.mobile && <span className="error">Your mobile number is required</span>}

            <input type="submit" />
          </form>
        </div>

        <div className="col-md-6" style={{display: shipInfo ? 'block' : 'none'}}>
          <h3>Payment Information</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePlaceOrder={handlePlaceOrder}>

            </CheckoutForm>
          </Elements>
          <br/>
          {
            orderId &&
            <div>
              <p>Your Order Id is: <span style={{textDecoration:'underline'}}>{orderId}</span></p>
              <h3>Thank You for Shopping with Us</h3>
            </div>
          }
        </div>
      </div>
    </div>
  )
};

export default Shipment;