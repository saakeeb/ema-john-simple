import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import {useEffect, useRef} from 'react';
import { useAuth } from '../Login/useAuth';



const usePrevious = value => {
    const prev = useRef();
    useEffect( () => {
        prev.current = value;
    }, [value])
    return prev.current;
}

const Header = () => {
    // const user = useContext(UserContext);
    const auth = useAuth();
    //console.log(auth.user);
    // const [count, setCount] = useState(0);
    // const previous = usePrevious(count);
    
    return (
        <div className="header">
            <img src={logo} alt=""/>

            {/* <h1>Count: {count} <br/> Previous: {previous}</h1>
            <button onClick={()=> setCount(count+1)}> <span style={{color:'green'}}>+</span></button>
            <button onClick={()=> setCount(count-1)}> <span style={{color:'red'}}>-</span></button> */}
  
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Inventory</a>
                {
                    auth.user &&
                
                    <span style={{color:"goldenrod"}}>Welcome {auth.user.name}</span>
                }
                {
                    auth.user ?  <a href="/login">Sign Out</a>
                    : <a href="/login">Sign In</a>
                }
            </nav>
        </div>
    );
};

export default Header;