import React, { Component } from 'react';
import { Route, NavLink,HashRouter } from 'react-router-dom';
import './App.css';

class map extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>

               <div className="back">
                <NavLink to="/" className="fas fa-arrow-left">
                 </NavLink>
                 </div>

            <div className="map">
                <img src="images/map.jpg" alt="image"/>
            </div>

            </div>
        )
    }
}

export default map;