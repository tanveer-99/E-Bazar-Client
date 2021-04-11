import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';


const FireAuth = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: ''
    })

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;

                const newUserInfo = {...userInfo};
                newUserInfo.name = user.displayName;
                newUserInfo.email = user.email;
                newUserInfo.isSignedIn = true;
                setUserInfo(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);

            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    return (
        <div className="fire-auth" >
            <button style={{boxShadow: '0px 5px 25px rgb(5, 244, 183)', border: 'none'}} onClick={handleGoogleSignIn} className="google-sign-in">Continue With Google</button>
            <br/>
            <button style={{boxShadow: '0px 5px 25px rgb(5, 244, 183)', border: 'none'}} className="facebook-sign-in">Continue With Facebook</button>
        </div>

    );
};

export default FireAuth;