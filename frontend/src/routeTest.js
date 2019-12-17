import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

const topics = [
    {
        name:'React Router',
        id:'react-router',
        description:'bskhfjskhfsdlzjfhjdfjfhjfh',
        resources:[
            {
                name:'URL parameters',
                id:'url-parameters',
                description:'hhhhhhhhhhhhhhhhhhh',
                url:'jhfjdhfjdfhjh'
            },
            {
                name:'Programmatically navigate',
                id:'programmatically navigate',
                description:'djfjjffjfjhjhjhkhkjh',
                url:'dfjfjdkfhjddf'
            }
        ]
    },
    {
        name:'React.js',
        id:'reactjs',
        description:'fhjfhjshfjfhjfhj',
        resources:[
            {
                name:'React Lifecycle Events',
                id:'react-lifecycle',
                description:'hhfjhfjhfj',
                url:'hfjfhjfhjfhj'
            },
            {
                name:'React AHA Moments',
                id:'react-aha',
                description:'dhjfhfjhfjhf',
                url:'djhjhjfhjfhj'
            }
        ]
    },
    {
        name:'Functional Programming',
        id:'functional-programming',
        description:'jhfjhfjahjfhjfhj',
        resources:[
            {
                name:'Imperative vs Declarative Programming ',
                id:'imperative-declarative',
                description:'fjfkfkjfkj',
                url:'jfdsjfhjfdf'
            },
            {
                name:'Building User Interface with pure functions and function composition',
                id:'fn-composition',
                description:'jfkljfkjfkjfk',
                url:'fhdfhjhfjhfj'
            }
        ]
    }
]

function Resource({match}){
    
    const topic = topics.find(({ id }) => id === match.params.topicId)
    .resources.find(({ id }) => id === match.params.subId)

    return(
    <div>
      <h3>{topic.name}</h3>
      <p>{topic.description}</p>
      <a href={topic.url}>More info.</a>
    </div>
    )
}

function Topic ({ match }) {
    const topic = topics.find(({ id }) => id === match.params.topicId)
  
    return (
      <div>
        <h2>{topic.name}</h2>
        <p>{topic.description}</p>
  
        <ul>
          {topic.resources.map((sub) => (
            <li key={sub.id}>
              <Link to={`${match.url}/${sub.id}`}>{sub.name}</Link>
            </li>
          ))}
        </ul>
  
        <hr />
  
        <Route path={`${match.path}/:subId`} component={Resource} />
      </div>
    )
  }
  
  function Topics ({ match }) {
    return (
      <div>
        <h1>Topics</h1>
        <ul>
          {topics.map(({ name, id }) => (
            <li key={id}>
              <Link to={`${match.url}/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
  
        <hr />
  
        <Route path={`${match.path}/:topicId`} component={Topic}/>
      </div>
    )
  }
  
  function Home () {
    return (
      <h1>
        Home.
      </h1>
    )
  }
  
  class routeTest extends Component {
    render() {
      return (
        <div>
        <Router>
          <div style={{width: 1000, margin: '0 auto'}}>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/topics'>Topics</Link></li>
            </ul>
  
            <hr />
  
            <Route exact path='/' component={Home} />
            <Route path='/topics' component={Topics} />
          </div>
        </Router>
        </div>
      )
    }
  }
  
  export default routeTest;
