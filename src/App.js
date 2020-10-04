import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import $ from 'jquery'; 
import './App.css';
class app extends React.Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
             <Register />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
      </div>
    )
  }
}

function hideIsInvalid(){
  $('#is-invalid').hide();
}
function Login(){
  let history = useHistory();
  function userLogin(){
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);
    const settings = {
     "async": true,
     "crossDomain": true,
     "url": "http://www.login-demo.tk/login",//http://www.login-demo.tk/
     "method": "POST",
     "headers": {},
     "processData": false,
     "contentType": false,
     "mimeType": "multipart/form-data",
     "data": form
   };
   $.ajax(settings).done(function (response) {
     let res = JSON.parse(response);
     if(res.name!==undefined){
       localStorage.setItem("name",res.name)
       history.push('/profile');
     }else{
       $('#is-invalid').show();
     }
   }).fail(function(err) {
    //do something when something is wrong
});
   }
  return (<header className="App-header">
  <div className="login-box">
    <h2>Login</h2>
          <form>
      <div className="user-box">
        <input type="text" name="" required="" id="email" onClick={hideIsInvalid}></input>
        <label>Email</label>
      </div>
      <div className="user-box">
        <input type="password" name="" required="" id="password" onClick={hideIsInvalid}></input>
        <label>Password</label>
      </div>
      <a href="#" onClick={userLogin}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </a>
    </form>
    <h6 className="text-danger hide" id="is-invalid">incorrect username or password</h6>
    <Link to="/register"><h6 className="secondary-link">if you don't have an account, create one here</h6></Link>
  </div>
  </header>);
}

function Register(){
  let history = useHistory();
  function userRegister(){
  
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("password", password);
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://www.login-demo.tk/register",
      "method": "POST",
      "headers": {},
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    };
    $.ajax(settings).done(function (response) {
      let res = JSON.parse(response);
      if(res.message==="User registered successfully!"){
        history.push("/login")
      }else{
        $('#is-invalid').show();
      }
    }).fail(function(err) {
      $('#is-invalid').show();
      //do something when something is wrong
  });
  
  }
  return ( <header className="App-header">
  <div className="login-box">
    <h2>Register</h2>
          <form>
      <div className="user-box">
        <input type="text" name="" required="" id="name" onClick={hideIsInvalid}></input>
        <label>Username</label>
      </div>
      <div className="user-box">
        <input type="text" name="" required="" id="email" onClick={hideIsInvalid}></input>
        <label>Email</label>
      </div>
      <div className="user-box">
        <input type="password" name="" required="" id="password" onClick={hideIsInvalid}></input>
        <label>Password</label>
      </div>
      <a href="#" onClick={userRegister}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </a>
    </form>
    <div>
      <h6 className="text-danger hide" id="is-invalid">something went wrong try again!</h6>
      <Link to="/login"><h6 className="secondary-link">Already having a account!</h6></Link>
    </div>
  </div>
  </header> );
}

function Profile(){
  let history = useHistory();
  let name = localStorage.getItem("name");
  
  function userLogout(){
    localStorage.clear();
    history.push('/login');
  }

  if(name===null){
    userLogout();
  }

  return (<header className="App-header">
  <div className="login-box">
    <h2>Hi {name}</h2> 
    <div>
      <h6 className="secondary-link" onClick={userLogout}>Logout</h6>
    </div>
  </div>
  </header>);

  
}





export default app;


