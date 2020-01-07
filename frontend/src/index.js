import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route,  BrowserRouter as Router, Switch, NavLink } from 'react-router-dom'
import App from './App'
import login from './login'
import feedback from './feedback'
import participants from './participants'
import quiz from './quiz'
import map from './map'

const routing = (
  <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={login}/>
        <Route path="/feedback" component={feedback}/>
        <Route path="/participants" component={participants}/>
        <Route path="/quiz" component={quiz}/>
        <Route path="/map" component={map}/>
      </Switch>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
