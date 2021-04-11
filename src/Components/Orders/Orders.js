import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import Navbar from '../Navbar/Navbar';
import './Orders.css'

const Orders = () => {
    const [isLoaded, setIsLoaded] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orderedProducts, setOrderedProducts] = useState();

    fetch('http://localhost:5000/orderedItems?email=' + loggedInUser.email)
    .then(response => response.json())
    .then(data => {
        setIsLoaded(false);
        setOrderedProducts(data);
    });

    return (
        <div className="order-page">
            <div className="container">
            <Navbar></Navbar>
            <div style={{marginTop: '3rem'}}>
            <h3>Orders From: {loggedInUser.email}</h3>
                    <div className="ordered-items">
                        
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    orderedProducts?.map( product =>
                                         <tr>
                                             <th>{product.name}</th>
                                             <th>{product.price}</th>
                                             <th>1</th>
                                         </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div> 

                    </div>
                
            
        </div>
        </div>
    )
}

export default Orders;