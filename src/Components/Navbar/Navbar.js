import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { UserContext } from '../../App';
import firebase from "firebase/app";



const Navbar = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const handleLogOut = () => {

        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            setLoggedInUser({});
          }).catch((error) => {
            // An error happened.
          });

    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">

                <a class="navbar-brand" href="#">E-Bazar</a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link to="/">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Home</a>
                        </li>
                    </Link>
                    
                    <Link to="/orders">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Orders</a>
                        </li>
                    </Link>

                    <Link to="/admin">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Admin</a>
                        </li>
                    </Link>

                    <Link to="/deals">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Deals</a>
                        </li>
                    </Link>

                    <Link to="/login"><button
                    onClick={handleLogOut}>
                    {
                        loggedInUser.email ? 'Log Out' : 'Login'
                    }</button></Link>
                </ul>
                
                </div>
            </div>
        </nav>
    );
};

export default Navbar;