import React, { useState } from 'react'


const Person = ({person}) => 
  <div>{person.name}</div>


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number:''}
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    console.log('here');
    
    event.preventDefault()
    const person = {
      name: newName,
      number: ''
    }
    setPersons(persons.concat(person))
    console.log(persons);
    setNewName('')
  }

  const handleTextField = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value = {newName} onChange={handleTextField} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} person={person}/>)}
    </div>
  )

}

export default App