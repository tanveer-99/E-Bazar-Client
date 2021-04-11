import React, { useEffect, useState } from 'react';
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar.js'
import Products from '../../Components/Products/Products'
import Spinner from '../Spinner/Spinner';

const Home = () => {

    const [items, setItems] = useState();
    const [isLoaded, setIsLoaded] = useState(true);
   
   useEffect(()=> {
        fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(data => {
            setItems(data);
            setIsLoaded(false);
        })
   }, [])
   console.log(items)
   
    return (

        <div className="home">
        <div className="container ">
            <Navbar></Navbar>
            <div className="search-food">
                <input type="text" placeholder="Search Food"></input>
                <button>Search</button>
            </div>
            {
                isLoaded && <Spinner></Spinner>
            }
            <div className="product-section">
                <div className="row">
                    {
                        items?.map( (pd)=> <Products pro={pd}></Products> )
                    }
                </div>
            </div>
            

            
        </div>

        </div>
    
    );
};
    
export default Home;