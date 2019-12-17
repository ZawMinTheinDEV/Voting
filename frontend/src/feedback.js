import React, { Component } from 'react';
import { Route, NavLink,HashRouter } from 'react-router-dom';
import './feedback.css';

class feedback extends Component{

   render(){

      return(
        <div class="feedbackBox">
        
        <img src="techClub.png" class="techClub"/>
        <form action="" class="feedbackForm">
            <div type="text" style={{letterSpacing : 0.1+'em'}} >Please send us your feedback </div>
            <textarea type="text"  class="feedbackInput" required /> 
            <input type="submit" class="submitButton" value="Send"/>
        </form>
        </div>
      )

   }

}

export default feedback;