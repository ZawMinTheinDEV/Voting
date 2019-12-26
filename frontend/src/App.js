import React, { Component } from 'react';
import { Route, NavLink,HashRouter } from 'react-router-dom';
import './App.css';
import '../node_modules/aos/dist/aos.css'
import AOS from 'aos';

class App extends Component {

    constructor(props){
        super(props);
        AOS.init();
        this.state={ list:[] };
    }
    
    componentWillReceiveProps(){
        AOS.refresh();
    }
    
    onClick=(id,title)=>{
        localStorage.setItem('targetId',id);
        localStorage.setItem('targetCategoryName',title);
    } 

    componentDidMount(){  

      fetch("http://172.26.4.31:5000/category")
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
                                <div key={list.cid} className="categories" data-aos="fade-right"  onClick={()=>this.onClick(list.cid,list.name)}>
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
                        {
                            console.log(this.state.list.length)
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