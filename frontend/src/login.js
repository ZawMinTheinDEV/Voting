import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import './login.css';

class login extends Component {

   constructor(props) {
      super(props);
      this.state = {
         code:'',auth:false
      }
   }

   componentDidMount(){
      this.QRLogin(window.location.href);
   }

   handleChange = (e) => {
      e.preventDefault();
      this.setState({
         code: e.target.value
      })
   }

   handleSubmit = async e => {

      e.preventDefault();

      var res = await fetch("http://localhost:5000/login?code="+this.state.code , {
         method: "GET"
      }); 
      
      var data = await res.json();
      console.log(data)
      if(data.result == "true") {
      this.setState({auth:true}) 
      localStorage.setItem("code",this.state.code)
       }
       else{ 
      this.setState({auth:false});
      localStorage.setItem("code",this.state.code)
       }
      console.log(this.state.auth)
   }
   
   QRLogin = (url) =>{
     /////need to change later
     
      var b = url.substr(33,41);
      document.querySelector('.keyInput').value = b;
      this.setState({code:b});
   }

   render() {

      if (this.state.auth) {
         return (
            <div className="loginBox">
               <img src="techClub.png" className="techClub" />
               <form className="loginForm" onSubmit={this.handleSubmit} >
                  <div type="text" style={{ letterSpacing: 0.1 + 'em' }} >Please enter your key </div>
                  <input type="text" placeholder="abcd1234" className="keyInput" name="code" onChange={this.handleChange} required />
                  <input type="submit" className="submitButton" value="Submit" />
               </form>

            <div className="box">
             <div className="success">Login success.. <br/> Happy Voting!<NavLink to="/" className="home">OK</NavLink></div>
            </div>
            </div>
         )
      }
      else{
         return (
            <div className="loginBox">
               <img src="techClub.png" className="techClub" />
               <form className="loginForm" onSubmit={this.handleSubmit} >
                  <div type="text" style={{ letterSpacing: 0.1 + 'em' }} >Please enter your key </div>
                  <input type="text" placeholder="abcd1234" className="keyInput" name="code" onChange={this.handleChange} required />
                  <div className="fail">Type your code carefully!</div>
                  <input type="submit" className="submitButton" value="Submit" />
               </form>
            </div>
         )
      } 


   }

}

export default login;