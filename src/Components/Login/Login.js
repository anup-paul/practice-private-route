import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './FirebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        photo: ''
    })


    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email, photoUrl } = result.user;
                const signInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    success: true,
                    photo: photoUrl
                }
                setUser(signInUser)
                setLoggedInUser(signInUser);
                history.replace(from);
                // console.log(signInUser)
            }).catch((error) => {

                var errorMessage = error.message;

            });
    }


    const handleGoogleSignOut = () => {
        firebase.auth().signOut()
            .then((res) => {
                const signOutUser = {
                    isSignIn: false,
                    name: '',
                    email: '',
                    photoUrl: ''
                }
                setUser(signOutUser);
            }).catch((error) => {
                // An error happened.
            });
    }


    const handleFbSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth().signInWithPopup(fbProvider)
            .then((result) => {
                // const newUserInfo = { ...user };
                //     newUserInfo.error = '';
                //     newUserInfo.success = true;
                //     newUserInfo.name = user.name;
                //     setUser(newUserInfo);
                //     updateUserName(user.name);
                const { displayName, email, photoUrl } = result.user;
                const signInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    success: true,
                    photo: photoUrl
                }
                setUser(signInUser);
                setLoggedInUser(signInUser);
                history.replace(from);
            })
            .catch((error) => {
                const newUserInfo = { ...user }
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);

            });

    }

    const handleFbSignOut = () => {
        firebase.auth().signOut()
            .then((res) => {
                const signOutUser = {
                    isSignIn: false,
                    name: '',
                    email: '',
                    photoUrl: ''
                }
                setUser(signOutUser);
            }).catch((error) => {
                // An error happened.
            });
    }


    const handleGhSignIn = () => {
        const gitProvider = new firebase.auth.GithubAuthProvider();
        firebase
            .auth()
            .signInWithPopup(gitProvider)
            .then(result => {
                const { displayName, email, photoUrl } = result.user;
                const signInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    success: true,
                    photo: photoUrl
                }
                setUser(signInUser);
                setLoggedInUser(signInUser);
                history.replace(from);
            }).catch((error) => {

                const newUserInfo = { ...user }
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
    }

    const handleGhSignOut = () => {
        firebase.auth().signOut()
            .then((res) => {
                const signOutUser = {
                    isSignIn: false,
                    name: '',
                    email: '',
                    photoUrl: ''
                }
                setUser(signOutUser);
            }).catch((error) => {
                // An error happened.
            });
    }



    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 5
            const passwordNumber = /\d{1}/.test(event.target.value)
            isFieldValid = isPasswordValid && passwordNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }


    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUser = res.user;
                    // console.log(newUser)
                    const newUserInfo = { ...newUser };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.name = user.name;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUser = res.user;
                    const newUserInfo = { ...newUser };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    // console.log(newUser);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);

                });
        }

        event.preventDefault();
    }


    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(res => {
            //    console.log("update user name successfully", res)
        }).catch(function (error) {
            console.log(error);
        });
    }


    return (
        <div style={{ textAlign: "center" }}>
            <h1>this is my login page</h1>


            {
                user.isSignIn ?
                    <button onClick={handleGoogleSignOut} >Sign out from google</button> :
                    <button onClick={handleGoogleSignIn} >Sign in with google</button>

            }
            <br />
            {
                user.isSignIn ?
                    <button onClick={handleFbSignOut}>Sign out from Facebook</button> :
                    <button onClick={handleFbSignIn}>Sign in with Facebook</button>

            }
            <br />
            {
                user.isSignIn ?
                    <button onClick={handleGhSignOut}>Sign out from github</button> :
                    <button onClick={handleGhSignIn}>Sign in with github</button>

            }



            <p>email:{user.email}</p>
            <p>name:{user.name}</p>
            <br />
            <br />



            <input type="checkbox" onChange={() => setNewUser(!newUser)} />
            <label htmlFor="newUser" >New User Sign up</label>
            <form onSubmit={handleSubmit}>
                {
                    newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="enter your name" />
                }
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="enter your email" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="enter your password" required />
                <br />
                <input type="submit" value={newUser ? "sign up" : "sign in"} />
            </form>



            <p style={{ color: 'red' }} >{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }} >User {newUser ? "created" : "logged in"} successfully</p>
            }
        </div>
    );
};

export default Login;