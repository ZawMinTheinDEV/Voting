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
          list:[],
          unauth:false
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

   handleVote =async (cid,pid)=>{
       if(localStorage.getItem("auth") == "true"){
           console.log(localStorage.getItem("code"))
           console.log(cid)
           console.log(pid)
          this.postToSErver(cid,pid,localStorage.getItem("code"))
       }
       else if(localStorage.getItem("auth") == "false" || localStorage.getItem("auth") == null){
          this.setState({unauth:true})
       }
   }
   
   
   postToSErver =(cid,pid,code)=>{
    
    let vote = {
       pid,cid,code
    }

    axios
    .post('http://localhost:5000/vote', vote)
    .then(() => console.log('vote Created'))
    .catch(err => {
      console.error(err);
    });

    

//        console.log(JSON.stringify({cid,pid,code}))
//     fetch("http://localhost:5000/vote",{
       

//        cid, pid ,code

//         // // method: "POST",
//         // // headers: {
//         // //     "Content-Type": "application/json"
//         // //   },
//         // //body:JSON.stringify({
//         //     cid, 
//         //     pid, 
//         //     code
//         // })
//      }).then((res) => console.log(res))
//      .then((data) =>  console.log(data))
//      .catch((err)=>console.log(err))
//    
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
                    <div key={list.pid} className="card" data-aos="fade-right">
                    <img src={list.image} alt="image"/>
                    <div >
                      <div>{list.name }</div>
                        <button onClick={() => this.handleVote(list.cid,list.pid)} >Vote</button>
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

        