import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBexiaiz2hKEHNgbqOITcp4jWGrYzxxtUg",
  authDomain: "nestjs-graphql-19076.firebaseapp.com",
  projectId: "nestjs-graphql-19076",
  storageBucket: "nestjs-graphql-19076.appspot.com",
  messagingSenderId: "572186510736",
  appId: "1:572186510736:web:9ef1b27ad2bbdfc98e9f15"
};
const app = initializeApp(firebaseConfig);
const provider = new FacebookAuthProvider();

function App() {

  const handleClickFb=()=>{
    window.FB.login(function(response) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          window.FB.api('/me', function(response) {
          console.log('Good to see you, ' + response.name + '.');
         });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
    });
  };

  const handleClickFbWithFirebase = () => {

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("🚀 ~ file: App.js ~ line 24 ~ .then ~ result", result)
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log("🚀 ~ file: App.js ~ line 18 ~ .then ~ accessToken", accessToken)

        // ...
      })
      .catch((error) => {
        console.log("🚀 ~ file: App.js ~ line 35 ~ handleClick ~ error", error)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log("🚀 ~ file: App.js ~ line 42 ~ handleClick ~ credential", credential)

        // ...
      });
  }

  const checkLoginState=()=>{
    window.FB.getLoginStatus(function(response) {
      console.log('getLoginStatus', response);
    });
  }

  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
          appId      : '997905604271695',
          xfbml      : true,
          version    : 'v0.1'
        });
      window.FB.AppEvents.logPageView();
      
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // 
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button  onClick={handleClickFb}>Login Fb</button>
      <button  onClick={handleClickFbWithFirebase}>Login Fb with Firebase</button>
      <button  onClick={checkLoginState}>Check login</button>

    </div>
    
  );
}

export default App;
