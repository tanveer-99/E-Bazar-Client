import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import deleteIcon from '../../icons/delete.png'
import editIcon from '../../icons/edit 1.png'

const EditProduct = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orderList, setOrderList] = useState();
    
        fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(data => {
            setOrderList(data);
        })
     
   

    return (
        <div className="manage">
            <h3>Edit Product</h3>

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

export default EditProduct;