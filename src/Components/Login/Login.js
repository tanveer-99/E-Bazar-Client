import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';
import FireAuth from '../FireAuth/FireAuth';
import Navbar from '../Navbar/Navbar';

firebase.initializeApp(firebaseConfig);


const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    const [newUser, setNewUser] = useState(false);
    const [userInfo, setUserInfo] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: ''
    })


    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleChange = (e) => {

        let isFieldValid = true;
        if(e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(e.target.name === 'name') {
            const newUserInfo = {...userInfo};
            newUserInfo[e.target.name] = e.target.value;
            setUserInfo(newUserInfo);
        }
        if(isFieldValid) {
            const newUserInfo = {...userInfo}
            newUserInfo[e.target.name] = e.target.value;
            setUserInfo(newUserInfo);
        }
    }


    const handleSubmit = (e)=> {
        console.log("submitted");
        console.log(userInfo.email, userInfo.password);
        
       if(!newUser) {
            firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
            .then((response) => {
                console.log("user signed in");
                const newUserInfo = {...userInfo};
                newUserInfo.name = response.user.displayName;
                newUserInfo.isSignedIn = true;
                setUserInfo(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                const newUserInfo = {...userInfo};
                newUserInfo.error = errorMessage;
                setUserInfo(newUserInfo);
                setLoggedInUser(newUserInfo);
                console.log(errorMessage);
            });
       }

       if(newUser) { 
            firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
            .then((response) => {
                handleUpdateUsername(userInfo.name);
                setLoggedInUser(userInfo);
                history.replace(from);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const newUserInfo = {...userInfo};
                newUserInfo.error = errorMessage;
                setUserInfo(newUserInfo);
                setLoggedInUser(newUserInfo);
            });
            
       }

        e.preventDefault();
    }


    const handleUpdateUsername = (name)=> {
        var user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name,
        })
        .then(function() {
            const newUserInfo = {...userInfo};
            newUserInfo.name = user.displayName;
            newUserInfo.isSignedIn = true;
            console.log(userInfo)
            console.log(newUserInfo)
            setUserInfo(newUserInfo);
            console.log(userInfo)
            console.log("username updated successfully", userInfo.name)
        })
        .catch(function(error) { 
            console.log(error);
        });
    }


    const handle = ()=> {
        setNewUser(!newUser);
    }

    return (
        <div className="login">
        <div className="container form">
            
            <Navbar></Navbar>
            <div className="login-form">
                <form onSubmit={handleSubmit} className="form-inputs">

                    <h4>{newUser ? "Create an account" : "Login"}</h4>
                    <br/>

                    {
                        newUser && <div>
                            <input onChange={handleChange} type="text" placeholder="Name" name="name" required/>
                            <br/>
                        </div>
                    }

                    <input onChange={handleChange} name="email" type="text" placeholder="Email" required/>
                    <br/>

                    <input onChange={handleChange} type="password" name="password" id="" placeholder="Password" required/>
                    <p style={{fontSize: '0.5rem', color: 'red'}}>password must be 6 characters and more with at least one number</p>
                    <br/>

                    {
                        newUser && <div>
                            <input type="password" name="" id="" placeholder="Confirm Password" required/>
                            <br/>
                        </div>
                    }
                    
                    <input name="login" type="submit"
                    value={newUser ? "Create an account" : "Login"}
                    className="create-btn" placeholder="Login"/>
                    <br/>

                    <p className="text-center mt-3">
                    { newUser ? "Already have an account? " : "Don't have an account? "
                    }
                    <span onClick={handle}>
                    { newUser ? "Login " : "Create an account "}
                    </span></p>
                    
                </form>
            </div>

            <p className="text-center" style={{color: 'red'}}>{loggedInUser.error}</p>
            <p className="text-center" style={{color: 'white'}}>or</p>

                   <FireAuth></FireAuth>
        </div>
        </div>
    );
};

export default Login;