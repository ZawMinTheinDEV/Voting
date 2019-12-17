import React, { Component } from 'react';
import { Route, NavLink,HashRouter } from 'react-router-dom';
import './login.css';

class login extends Component{

   constructor(props){
      super(props);
      this.state ={
         code:'',login:false
      }
   }

   onChange=(e)=>{
      e.preventDefault();
      this.setState({
         code:e.target.value
      })
   }

   onSubmit=()=>{
      fetch("http://localhost:5000/login?code="+this.state.code+"",{
         method:"GET",
        
         query: this.state.code
      })
      .then(res=>res.json())
      .then(
          json=>{
         console.log(json);
              this.setState({
                login:json['result'] 
              })
          }
          
      )
    }

   render(){

      return(
        <div className="loginBox">
        <img src="techClub.png" className="techClub"/>
        <form  className="loginForm" onSubmit={this.onSubmit} > 
            <div type="text" style={{letterSpacing : 0.1+'em'}} >Please enter your key </div>
            <input type="text" placeholder="abcd1234" className="keyInput" name= "code" onChange={this.onChange} required/> 
            <input type="submit" className="submitButton" value="Submit"/>
        </form>
        </div>
      )

   }

}

export default login;