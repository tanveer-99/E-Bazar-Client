import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Spinner from '../Spinner/Spinner';
import './AddProduct.css'

const AddProduct = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        imageURL: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isInserted, setIsInserted] = useState(false);
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const handleProductName = (event)=> {
        const newProductName = {...newProduct};
        newProductName.name = event.target.value;
        setNewProduct(newProductName);
    }

    const handleProductPrice = (event)=> {
        const newProductPrice = {...newProduct};
        newProductPrice.price = event.target.value;
        setNewProduct(newProductPrice);
    }
    

    const handleImageUpload = (event) => {
        const imageData = new FormData();
        imageData.set('key', '62143a8a5955d1a93127464ec2f9c180');
        imageData.append('image', event.target.files[0]);
        
        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            const newProductImage = {...newProduct};
            newProductImage.imageURL = response.data.data.display_url;
            setNewProduct(newProductImage);
            setIsImageUploaded(true);
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    if(isImageUploaded) {

        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        setIsImageUploaded(false);
        setIsInserted(true);

    }

    const onSubmit = () => {
        setIsSubmitted(true);
        
    };

   

    return (
        <div className="add">
            <h3>Add Product</h3>


            {
                !isSubmitted && 

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="add-details">
                    
                        
                        <div className="name">
                            <h5>Add Name</h5>
                            <input required type="text" placeholder="Enter Name" {...register("example")}
                            onChange={handleProductName}
                            ></input>
                        </div>
                        <div className="price">
                            <h5>Add Price</h5>
                            <input required type="text" placeholder="Enter Price"
                            onChange={handleProductPrice}
                            ></input>
                        </div>
                        <div className="photo">
                            <h5>Add Photo</h5>
                            <input required type="file" placeholder="Choose File" onChange={handleImageUpload}></input>
                        </div>

                    </div>
                        <input type="submit" className="submit" value="Save"></input>
                </form>
            }

            {
                isSubmitted && !isInserted && <Spinner></Spinner>
            }
            
            {
                isSubmitted && isInserted && 
                <h3>data inserted</h3>
            }
                
            
        </div>
    );
};

export default AddProduct;