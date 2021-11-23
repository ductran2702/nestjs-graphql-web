import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  const handleClick=()=>{
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
      <button  onClick={handleClick}>Login</button>
      <button  onClick={checkLoginState}>Check login</button>

    </div>
    
  );
}

export default App;
