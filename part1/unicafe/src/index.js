import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//renders a button of specified label and event handler
const Button = ({onClick, text}) =>( 
  <button onClick = {onClick}>
    {text}
  </button>
)

//renders a stat line in a table
const StatisticsLine = ({text, value}) => (
  <tr> 
    <td>{text}</td>
    <td>{value}</td> 
  </tr>
)

//calls Statistics line to render all the stats in the 'stats' object
const Statistics = ({stats}) =>{
    if(stats.total !== 0){
      return(  
        <div>
          <h1>Statistics</h1>
          <table>
            <tbody>
              <StatisticsLine text = 'good' value = {stats.good} />
              <StatisticsLine text = 'neutral' value = {stats.neutral} />
              <StatisticsLine text = 'bad' value = {stats.bad} />
              <StatisticsLine text = 'total' value = {stats.total} />
              <StatisticsLine text = 'average' value = {stats.average} />
              <StatisticsLine text = 'positive%' value = {stats.positivePercent} />
            </tbody>
          </table>
        </div>
      )
    }
    return(<></>)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + bad + neutral
  const stats = {
    good:good,
    bad:bad,
    neutral: neutral,
    total: total,
    average: (good - bad) / total,
    positivePercent: good / total * 100
  }
  const handleGood = () => { setGood(good + 1) }
  const handleNeutral = () => { setNeutral(neutral + 1) }
  const handleBad = () => { setBad(bad + 1) }
  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick = {handleGood } text= 'good'/>
      <Button onClick = {handleNeutral} text= 'neutral'/>
      <Button onClick = {handleBad } text= 'bad'/>
      <Statistics stats = {stats}/>
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)

