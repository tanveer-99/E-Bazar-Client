import React, { useState } from 'react';
import './Admin.css'
import manage from '../../icons/grid 1.png'
import add from '../../icons/plus 1.png'
import edit from '../../icons/edit 1.png'
import ManageProduct from '../../Components/ManageProduct/ManageProduct'
import AddProduct from '../../Components/AddProduct/AddProduct';
import EditProduct from '../../Components/EditProduct/EditProduct'

const Admin = () => {
    const [isManage, setIsManage] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    
    const handleAdd = () => {
        setIsManage(false);
        setIsEdit(false);
        setIsAdd(true);
    }
    const handleManage = () => {
        setIsAdd(false);
        setIsEdit(false);
        setIsManage(true);

    }
    const handleEdit = () => {
        setIsManage(false);
        setIsAdd(false);
        setIsEdit(true);

    }
    return (
        <div className="admin-section">
            <div className="sidebar">
                    <h1>E-Bazar</h1>
                    <div className="manage-product" onClick={handleManage}>
                        <img src={manage}></img>
                        <h5>Manage Product</h5>
                    </div>
                    <div className="add-product" onClick={handleAdd}>
                        <img src={add}></img>
                        <h5>Add Product</h5>
                    </div>
                    <div className="edit-product" onClick={handleEdit}>
                        <img src={edit}></img>
                        <h5>Edit Product</h5>
                    </div>
            </div>

            <div className="edit-section">
                {
                    isAdd && <AddProduct></AddProduct>
                }
                {
                    isManage && <ManageProduct></ManageProduct>
                }
                {
                    isEdit && <EditProduct></EditProduct>
                }
            </div>
            
        </div>
    );
};

export default Admin;