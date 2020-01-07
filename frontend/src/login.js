import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import './login.css';

class login extends Component {

   constructor(props) {
      super(props);
      this.state = {
         code:'',auth:''
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

      var res = await fetch("http://52.76.67.93:5000/login?code="+this.state.code , {
         method: "GET"
      }); 
      //http://utc.codes/login?code=zvwnW8gT
      var data = await res.json();
      console.log(data)
      if(data.result == "true") {
      this.setState({auth:'true'}) 
      localStorage.setItem("code",this.state.code)
      localStorage.setItem("auth","true")
       }
       else{ 
      this.setState({auth:'false'}); 
      localStorage.setItem("auth","false")
       }
      console.log(this.state.auth)
   }
   
   QRLogin = (url) =>{
      var b = url.substr(33,41);
      document.querySelector('.keyInput').value = b;
      this.setState({code:b});
   }

   render() {

      if (this.state.auth == 'true') {
         return (
            <div className="loginBox">
                <div className="back">
            <NavLink to="/" className="fas fa-arrow-left">
             </NavLink>
             </div>
               <div className="techClub"><img src="tech.png" /></div>
               <form className="loginForm" onSubmit={this.handleSubmit} >
                  <div type="text" style={{ letterSpacing: 0.1 + 'em' }} >Please enter your key </div>
                  <input type="text" placeholder="Code Here" className="keyInput" name="code" onChange={this.handleChange} required />
                  <input type="submit" className="submitButton" value="Login" />
               </form>

            <div className="box">
             <div className="success">Login success.. <br/> Happy Voting!<NavLink to="/" className="home">OK</NavLink></div>
            </div>
            </div>
         )
      }
      else if(this.state.auth == 'false'){
         return (
            <div className="loginBox">
                <div className="back">
            <NavLink to="/" className="fas fa-arrow-left">
             </NavLink>
             </div>
              <div className="techClub"><img src="tech.png" /></div>
               <form className="loginForm" onSubmit={this.handleSubmit} >
                  <div type="text" style={{ letterSpacing: 0.1 + 'em' }} >Please enter your key </div>
                  <input type="text" placeholder="Code Here" className="keyInput" name="code" onChange={this.handleChange} required />
                  <div className="fail">Wrong code.. Try again!</div>
                  <input type="submit" className="submitButton" value="Login" />
               </form>
            </div>
         )
      } 
      else{
         return (
            <div className="loginBox">
                <div className="back">
            <NavLink to="/" className="fas fa-arrow-left">
             </NavLink>
             </div>
               <div className="techClub"><img src="tech.png" /></div>
               <form className="loginForm" onSubmit={this.handleSubmit} >
                  <div type="text" style={{ letterSpacing: 0.1 + 'em' }} >Please enter your key </div>
                  <input type="text" placeholder="Enter Here" className="keyInput" name="code" onChange={this.handleChange} required />
                  <input type="submit" className="submitButton" value="Login" disabled/>
               </form>
            </div>
         )
      }


   }

}

export default login;