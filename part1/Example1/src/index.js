import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name} you are {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  const ika = 58

  return (
    <>
      <h1>Greetings</h1>
      <Hello name = "a" age = {13} />
      <Hello name = "b" age = {ika} />
      <Hello name = "c" age = {83} />
      <Footer />
    </>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by 
      <a href="https://github.com/mluukkai"> mluukkai</a>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
 