import '../node_modules/aos/dist/aos.css'
import React, { Component } from 'react';
import { Route, NavLink,HashRouter } from 'react-router-dom';
import './participants.css';
import AOS from 'aos';


class participants extends Component{

   constructor(props){
       super(props);
       this.state = {
          targetId:'',
          targetName:'',
          olist:[],
          list:[]
       }
       AOS.init();
   } 

   async componentDidMount(){
    
    this.state.targetId = localStorage.getItem('targetId');
    this.state.targetName = localStorage.getItem('targetCategoryName');
    await fetch("http://localhost:5000/participant")
    .then(res=>res.json())
    .then(
        json=>{
            console.log(json);
            this.setState({
                olist:json['result']
            })
           
        }
    )
  }

   componentWillReceiveProps(){
       AOS.refresh();
   }

   render(){
       {    
        this.state.olist.forEach(e=>{
            if(e.cid == this.state.targetId)
            this.state.list.push(e);
        })
       }
       return(
        <div> 
             <header>
               <h1>{this.state.targetName}</h1>
               
             </header>

             <div className="container">
        
             {
                this.state.list.map( list =>(
                    <div key={list.pid} className="card" data-aos="fade-right">
                    <img src={list.image} alt="image"/>
                    <div >
                      <div>{list.name }</div>
                        <button>Vote</button>
                    </div >
                    </div>
                ))
            
            }

             </div>

        </div>
       )
   }

}

export default participants;

        