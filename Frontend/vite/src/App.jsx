import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [count, setCount] = useState(0)
  const [name, setName] =useState('')
  const [email, setEmail] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    
  };


  return (
    <>
      <div>
        <div><h1>Welcome {name}, {email}</h1></div>
        <div>
          <form>
            <label>name</label>
            <input></input>
            <label>email</label>
            <input></input>
            <button>Submit</button>
          </form>
        </div>
        
      </div>
    </>
  )
}

export default App
