import React from 'react';
import { UserContext } from '../../App';

const Cart = (props) => {
    const cart=props.cart;;
    // const user = useContext(UserContext);
    // console.log(user);
    //const total= cart.reduce ((total, prd) => total+prd.price ,0);
    let total= 0;
    for(let i=0; i<cart.length; i++){
        const product= cart[i];
        total= total + product.price * product.quantity;
        //debugger;
    }
    
    // for (let index = 0; index < array.length; index++) {
    //     const element = array[index];
        
    // }
    let shipping=0;
    if ( total>35 ) {
        shipping = 0;
    }
    else if( total>15 ){
        shipping = 4.99;
    }
    else if(total>0){
        shipping = 12.99;
    }
    const tax= (total/10).toFixed(2);
    const grandTotal=(total + shipping + Number (tax)).toFixed(2);
    
    const formatNumber = num =>{
        const precision =num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <h5>Items Ordered:{cart.length}</h5>
            <h4>Product Price: ${formatNumber (total)}</h4>
            <h5>Shipping Cost: ${shipping}</h5>
            <h5> Tax + Vat: ${tax}</h5>
            <h3>Total Price: ${grandTotal}</h3>
            {
                props.children
            }
            <br/>
              
        </div>
    );
};

export default Cart;