import React, { Component } from 'react';
import { Route, NavLink,HashRouter } from 'react-router-dom';
import './feedback.css';
import axios from 'axios';

class feedback extends Component{

   constructor(props){
      super(props);
      this.state = {
         feedback:'',success:''
      }
   }

   handleChange = e => {
      e.preventDefault();
      this.setState({
         feedback: e.target.value
      })
   }
   
   handleSubmit = async e =>{
      e.preventDefault();

      var res = await fetch("http://52.76.67.93:5000/feedback?feedback="+this.state.feedback , {
         method: "GET"
      }); 
      
      var data = await res.json();
      console.log(data)
      if(data.result == "true") {
      this.setState({success:"true"}) 
       }
       else{ 
      this.setState({succcess:"false"}); 
       }
   }

   render(){
      
      if(this.state.success == "true"){
      return(
        <div class="feedbackBox">
         <div className="back">
            <NavLink to="/" className="fas fa-arrow-left">
             </NavLink>
             </div>
        <img src="tech.png" class="techClub"/>
        <form  class="feedbackForm" onSubmit={this.handleSubmit}>
            <div type="text" style={{letterSpacing : 0.1+'em'}} >Please send us your feedback </div>
            <textarea type="text"  class="feedbackInput" onChange={this.handleChange} required /> 
            <input type="submit" class="submitButton" value="Send"/>
        </form>
        <div className="box">
             <div className="success">Your feedback is submitted.<br/> Thank you.<NavLink to="/" className="home">OK</NavLink></div>
            </div>
        </div>
      )
      }
      else{
         return(
            <div class="feedbackBox">
             <div className="back">
                <NavLink to="/" className="fas fa-arrow-left">
                 </NavLink>
                 </div>
            <img src="tech.png" class="techClub"/>
            <form  class="feedbackForm" onSubmit={this.handleSubmit}>
                <div type="text" style={{letterSpacing : 0.1+'em'}} >Please send us your feedback </div>
                <textarea type="text"  class="feedbackInput" onChange={this.handleChange} required /> 
                <input type="submit" class="submitButton" value="Send"/>
            </form>
            </div>
         )
      }

   }

}

export default feedback;