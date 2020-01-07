import React, { Component } from 'react';
import { Route, NavLink,HashRouter } from 'react-router-dom';
import './App.css';
import '../node_modules/aos/dist/aos.css'
import AOS from 'aos';

class App extends Component {

    constructor(props){
        super(props);
        AOS.init();
        this.state={ 
            list:[]
        };
    }
    
    componentWillReceiveProps(){
        AOS.refresh();
    }
    
    onClick=(id,title)=>{
        localStorage.setItem('targetId',id);
        localStorage.setItem('targetCategoryName',title);
    } 

   async componentDidMount(){  

      fetch("http://52.76.67.93:5000/category")
      .then(res=>res.json())
      .then(
          json=>{
              console.log(json);
              this.setState({
                  list:json['result']
              })
          }
      )

      if(localStorage.getItem("auth") == "true"){
        var res = await fetch("http://52.76.67.93:5000/lucky?lucky="+localStorage.getItem("code"), {
            method: "GET"
         }); 
         var data =await  res.json();
         //console.log(data.results[0].LUCKY_number);
         localStorage.setItem("lucky",data.results[0].LUCKY_number)
        }

      
    }
    
    handleLogout=()=>{
        localStorage.setItem("auth","false");
        this.componentDidMount();
    }

    render() {
        
        if(localStorage.getItem("auth") == "true" && localStorage.getItem("code").indexOf("0") == 0
        && localStorage.getItem(localStorage.getItem("code")+"quiz") != "true"){
        return (

            <div className="wrapApp"> 

                <div className="title-box">
                    {/* <div className="title">UCSM Fresher Welcome 2020</div> */}
                </div>
                
                <div className="logout-box">
                <button  className="logout-btn" onClick={this.handleLogout} >Log Out</button>
                </div>

                <div className="category-box" >

                <div className="categories lucky">
                Your lucky number is
                 <div className="lucky-num">
                     {localStorage.getItem("lucky")}
                 </div>
                </div>

                <div className="categories quiz">
                 Quizz for Freshers !
                 <NavLink to="./quiz">
                 <div className="go">
                     Go >>
                 </div>
                 </NavLink>
                </div>
                        {
                            this.state.list.map((list)=>(
                                <div key={list.cid} className="categories" data-aos="fade-right"  onClick={()=>this.onClick(list.cid,list.name)}>
                                <NavLink  to="./participants">
                                   <img src={list.image} alt="image"/> 
                                <div className="wrap">
                                   <div className="cap">{list.name}</div> 
                                </div>
                                </NavLink>
                                </div>
                            ))
                        }
                </div>


                <div className="footer">
                      Brought To You By UTC <img src="tech.png" />
                </div>

                <NavLink className="feedback" to="./feedback">
                    feedback
              </NavLink>

            </div>

        )
        }

        else if(localStorage.getItem("auth") == "true"){
            return (
    
                <div className="wrapApp">
    
                    <div className="title-box">
                        {/* <div className="title">UCSM Fresher Welcome 2020</div> */}
                    </div>
                    
                    <div className="logout-box">
                    <button  className="logout-btn" onClick={this.handleLogout} >Log Out</button>
                    </div>
    
                    <div className="category-box" >

                    <div className="categories lucky">
                Your lucky number is
                 <div className="lucky-num">
                     {localStorage.getItem("lucky")}
                 </div>
                </div>
                            {
                                this.state.list.map((list)=>(
                                    <div key={list.cid} className="categories" data-aos="fade-right"  onClick={()=>this.onClick(list.cid,list.name)}>
                                    <NavLink  to="./participants">
                                       <img src={list.image} alt="image"/> 
                                    <div className="wrap">
                                       <div className="cap">{list.name}</div> 
                                    </div>
                                    </NavLink>
                                    </div>
                                ))
                            }
                    </div>
    
    
                    <div className="footer">
                          Brought To You By UTC <img src="tech.png" />
                    </div>
    
                    <NavLink className="feedback" to="./feedback">
                        feedback
                  </NavLink>
    
                </div>
    
            )
            }

        else{
            return (

                <div className="wrapApp">
    
                    <div className="title-box">
                        {/* <div className="title">UCSM Fresher Welcome 2020</div> */}
                    </div>
                    
                    <div className="login-box">
                    <NavLink  className="login-btn"  to="./login">Log in to vote</NavLink>
                    </div>
    
                    <div className="category-box" >
                            {
                                this.state.list.map((list)=>(
                                    <div key={list.cid} className="categories" data-aos="fade-right"  onClick={()=>this.onClick(list.cid,list.name)}>
                                    <NavLink  to="./participants">
                                       <img src={list.image} alt="image"/> 
                                    <div className="wrap">
                                       <div className="cap">{list.name}</div> 
                                    </div>
                                    </NavLink>
                                    </div>
                                ))
                            }
                    </div>
    
    
                    <div className="footer">
                          Brought To You By UTC <img src="tech.png" />
                    </div>
    
                    <NavLink className="feedback" to="./feedback">
                        feedback
                  </NavLink>

                  <NavLink className="tomap" to="./map">
                      View Map
                  </NavLink>
    
                </div>
    
            )
        }

    }

}

export default App;