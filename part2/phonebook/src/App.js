import React, { useState } from 'react'



const Person = ({ person }) =>
  <div>{person.name} {person.number} </div>


const AddForm = ({ newName, newNumber, handleName, handleNumber, addPerson }) =>
  <form onSubmit={addPerson}>
    <div>name: <input value={newName} onChange={handleName} /> </div>
    <div>number: <input value={newNumber} onChange={handleNumber} /> </div>
    <div><button type="submit">add</button></div>
  </form>


const Search = ({ newSearch, handleSearch }) =>
  <div>Search: <input value={newSearch} onChange={handleSearch} /></div>


const RenderNumbers = ({ filteredList }) =>
  filteredList.map(person => <Person key={person.name} person={person} />)


const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const addPerson = (event) => {
    event.preventDefault()
    const person = { name: newName, number: newNumber }
    if (!persons.some(e => e.name === person.name)) {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
    else { window.alert(`${person.name} is already in the phonebook`) }
  }

  const handleName = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value);
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const filteredList = newSearch === '' ? persons : persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search newSearch={newSearch} handleSearch={handleSearch} />
      <h2>Add new</h2>
      <AddForm newName={newName} newNumber={newNumber} handleName={handleName}
        handleNumber={handleNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <RenderNumbers filteredList={filteredList} />
    </div>
  )

}

export default App