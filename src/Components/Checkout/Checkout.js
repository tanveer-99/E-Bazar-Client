import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router';
import Navbar from '../Navbar/Navbar';
import './Checkout.css'
import {
  Link
} from "react-router-dom";
import Spinner from '../Spinner/Spinner';

const Checkout = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {checkoutProduct} = useParams();
    const [orderedProduct, setOrderedProduct] = useState();
    const [isLoaded, setIsLoaded] = useState(true);

    fetch('http://localhost:5000/orderedItem?id=' + checkoutProduct)
    .then(response => response.json())
    .then(data => {
        
        setIsLoaded(false);
        setOrderedProduct(data[0]);
    });
    console.log(orderedProduct);
    
    return (
        <div className="checkout-page">
        <div className="container">
            <Navbar></Navbar>
            {
                isLoaded && <Spinner></Spinner>
            }
            {
                !isLoaded && 
                <div className="checkout-section">
                <h3 className="fw-bold">Checkout</h3>
                <div className="checkout">

                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Email</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr className="data">
                        <td>{orderedProduct?.name}</td>
                        <td>1</td>
                        <td>{loggedInUser.email}</td>
                        <td>{orderedProduct?.date}</td>
                        <td>${orderedProduct?.price}</td>
                        </tr>
                        
                        <tr>
                        <td colspan="4">Total</td>
                        <td>${orderedProduct?.price}</td>
                        
                        </tr>
                    </tbody>
                    </table>
                    <Link to="/orders"><button>Checkout</button></Link>
                </div>
            </div>
            }
        </div>
        </div>
    );
};

export default Checkout;