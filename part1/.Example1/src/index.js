import React, {useState} from 'react';
import ReactDOM from 'react-dom';

// Introduction
//--------------------------------------------------------------------------//
// const Hello = ({name, age}) => {
//   const bornYear = () =>  new Date().getFullYear() - age
//
//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born {bornYear()}</p>
//     </div>
//   )
// }
//
// const Footer = () => {
//   return (
//     <div>
//       greeting app created by 
//       <a href="https://github.com/mluukkai"> mluukkai</a>
//     </div>
//   )
// }
//
// const App = () => {
//   const ika = 58
//
//   return (
//     <>
//       <h1>Greetings</h1>
//       <Hello name = "a" age = {13} />
//       <Hello name = "b" age = {ika} />
//       <Hello name = "c" age = {83} />
//       <Footer />
//     </>
//   )
// }
//
//
//
// ReactDOM.render(<App />, document.getElementById('root'))
//
//--------------------------------------------------------------------------//



// Event handling
//--------------------------------------------------------------------------//
//
// const Display = ({counter}) => <div>{counter}</div>
//
//
// const Button = ({handleClick, text}) => (
//     <button onClick = {handleClick}>
//       {text}
//     </button>
//   )
//
//
// const App = (props) => {
//   const [counter, setCounter] = useState(0)
//   const increaseCount = () => setCounter(counter + 1)
//   const decreaseCount = () => setCounter(counter - 1)
//   const resetCount = () => setCounter(0)
//
//   return (
//     <div>
//       <Display counter = {counter}/>
//       <Button handleClick = {increaseCount} text = "plus"/>
//       <Button handleClick = {decreaseCount} text = "minus"/>
//       <Button handleClick = {resetCount} text = "reset"/>
//     </div>
//   )
// }
//
//
// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// )
//
//--------------------------------------------------------------------------//



//Complex state
//--------------------------------------------------------------------------//

const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text = "left" />
        <Button onClick={handleRightClick} text = "right" />
        {right}
        <History allClicks = {allClicks}/>
      </div>
    </div>
  )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)
