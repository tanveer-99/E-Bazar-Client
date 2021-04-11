import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Products.css'

const Products = (props) => {
    const { imageURL, name, price } = props.pro;

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    const [order, setOrder] = useState();

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const orderDate = day + '/' + month + '/' + year;
    const handleAddProduct = (e) => {
        const productInfo = props.pro;
        productInfo.date = orderDate;
        if(loggedInUser.email) {
            
            const newUserInfo = {...loggedInUser, ...productInfo};
            fetch('http://localhost:5000/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(newUserInfo)
            })
            
        }
    }
    
    
    return (
        <div className="col-md-4">
            <div className="product-details">
                <div className="product-image">
                    <img src={imageURL}></img>
                </div>
                <h6>{name}</h6>
                <div className="product-price">
                    <h4>${price}</h4>
                    <Link to={`/checkout/${props.pro._id}`}><button onClick={handleAddProduct}>Buy Now</button></Link>
                </div>
            </div>
        </div>
        
    );
};

export default Products;