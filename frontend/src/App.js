import React, { Component } from 'react';
import { Route, NavLink,HashRouter } from 'react-router-dom';
//import axios from 'axios';
import './App.css';


class App extends Component {

    constructor(props){
        super(props);
        this.state={ list:[] };
    }
    
   
    

    componentDidMount(){

      fetch("http://localhost:5000/category")
      .then(res=>res.json())
      .then(
          json=>{
              console.log(json);
              this.setState({
                  list:json['result']
              })
          }
      )
      
    }
    


    render() {

        return (

            <div>
                <div className="title-box">

                    <div className="title">UCSM Fresher Welcome 2020</div>
                </div>

                <div className="category-box" id="cbox">

                   <NavLink  className="login-btn" id="login-btn" to="./login">Log in to vote</NavLink>
                            
                         {   this.state.list.map((list)=>(
                                <div key={list.cid} className="categories">
                                <NavLink  to="./participants">
                                <div>
                                   <img src={list.image} /> 
                                </div>   
                                <div>
                                   {list.name} 
                                </div>
                                </NavLink>
                                </div>
                            ))
                        }

                    <div className="footer">
                      brought to you by UCSMTC <img src="techClub.png" />
                    </div>

                </div>

                <NavLink className="feedback" to="./feedback">
                    feedback
              </NavLink>
            </div>

        )

    }

}

export default App;