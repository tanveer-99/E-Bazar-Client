import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import './ManageProduct.css';
import deleteIcon from '../../icons/delete.png'
import editIcon from '../../icons/edit 1.png'

const ManageProduct = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orderList, setOrderList] = useState();
    
        fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(data => {
            setOrderList(data);
        })
     
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => "deleted successfully");
    }

    return (
        <div className="manage">
            <h3>Manage Product</h3>

            <div className="order-list">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        orderList?.map((order) => 
                            <tr className="data">
                                <td>{order.name}</td>
                                <td>${order.price}</td>
                                <td>
                                    <img src={editIcon}></img>
                                    <img onClick={() => handleDelete(order._id)} src={deleteIcon}></img>
                                    
                                </td>
                            </tr>
                        )
                    }
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProduct;