import React from 'react';
import axios from 'axios';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            time: 'start',
            title: 'Welcome to Quizz',
            text: 'Warning ! You have only one chance to select answers.',
            buttonText: 'Start' 
        };
        
        this.popupHandle = this.popupHandle.bind(this);
    }
    
    popupHandle() {
        let { time } = this.state;
        
        if(time === 'start'){
            this.setState({
                time: 'end',
                title: 'Congratulations!',
                buttonText: 'OK'
            });
            
            this.props.startQuiz();
        } else {   
            localStorage.setItem(localStorage.getItem("code")+"quiz","true") 
            
            let score = this.props.score;
            let code = localStorage.getItem("code");

            let b = {
                score,code
             }
             
              axios
             .post('http://localhost:5000/quiz',b)
             .then((res) =>  
             console.log(res.data.result)
             )
             .catch(err => {
               console.error(err);
             });

            window.history.back();
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            text: 'You have completed the quiz. <br /> You got: <strong>' + this.props.score + '</strong> out of <strong>' +this.props.total +'</strong> questions right.'
        })
    }
    
    createMarkup(text) {
        return {__html: text};
    }
    
    
    render() {
       
        let { title, text, buttonText } = this.state;
        
        let { style } = this.props;
        
        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="popup">
                            <h1>{title}</h1>
                            <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                            <button className="fancy-btn" onClick={this.popupHandle}>{buttonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup