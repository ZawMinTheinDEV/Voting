import '../node_modules/aos/dist/aos.css'
import React, { Component } from 'react';
import { Route, NavLink,HashRouter } from 'react-router-dom';
import './participants.css';
import AOS from 'aos';
import axios from 'axios';


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

   handleVote =(cid,pid)=>{
       if(localStorage.getItem("auth") == "true"){
          this.postToSErver(cid,pid,localStorage.getItem("code"))
          
          setTimeout(()=>{
          if(localStorage.getItem("voted") == "false"){
          document.querySelector('.box4').style.visibility = 'visible';
          }
          else{
          document.querySelector('.box3').style.visibility = 'visible';
          }
        },500)

       }
       else if(localStorage.getItem("auth") == "false" || localStorage.getItem("auth") == null){
            document.querySelector('.box2').style.visibility = 'visible';
       }
   }
   
   
   postToSErver =(cid,pid,code)=>{
    
    let vote = {
       pid,cid,code
    }
    
     axios
    .post('http://localhost:5000/vote', vote)
    .then((res) =>  //console.log(res.data.result)
       localStorage.setItem("voted",res.data.result)
    )
    .catch(err => {
      console.error(err);
    });
   
   }

   handleDeleteVote = (code,cid) =>{
      
    document.querySelector('.box4').style.visibility = 'hidden';

      let d = {
          code,cid
      }
     console.log(d)
      axios
      .post('http://localhost:5000/deletevote',d)
      .then((res) => console.log(res)
      )
      .catch( err => {
          console.log(err)
      })

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
               <h2>{this.state.targetName}</h2>
             </header>

             <div className="container">
        
             {
                this.state.list.map( list =>(
                    <div key={list.pid.toString()} className="card" data-aos="fade-right">
                    <img src={list.image} alt="image"/>
                    <div >
                      <div>{list.name }</div>
                        <button onClick={() => this.handleVote(list.cid,list.pid)} >Vote</button>
                    </div >
                    </div>
                ))
            }

             </div>
            
             <div className="box2">
             <div className="fail">Please Login to vote <NavLink to="/login" className="home">OK</NavLink></div>
            </div>

             <div className="box3">
             <div className="success">Voted successfully ! <NavLink to="/" className="home">OK</NavLink></div>
             </div>

             <div className="box4">
             <div className="cancel">
                 You have voted this category. Do you want to cancel vote?
             <NavLink to="/" className="home">Back</NavLink>
             <button className="btn" onClick={() => this.handleDeleteVote(localStorage.getItem("code"),this.state.targetId)}>Cancel Vote</button>
             </div>
             </div>
             
        </div>
       )
   }

}

export default participants;

        