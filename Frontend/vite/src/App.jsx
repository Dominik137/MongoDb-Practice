import React,{ useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
function App() {
  const [collection, setCollection] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
 
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
     fetch('http://127.0.0.1:5000/data', {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       mode: 'cors',
       body: JSON.stringify({
         name: name,
         email: email
       })
     })
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then(data => {
       console.log('Success:', data)
       setCollection([...collection, data]);
       setName('');
       setEmail('');
     })
     .catch(error => {
       console.error('Error:', error);
     });
     
  };
 
  useEffect(() => {
     fetch('http://127.0.0.1:5000/data')
     .then((r) => r.json())
     .then((data) => setCollection(data))
  }, []);
 
  return (
     <>
       <div>
         <div><h1>Welcome </h1></div>
         <div>
           <form onSubmit={handleSubmit}>
             <label>name</label>
             <input type='text' value={name} onChange={handleNameChange}></input>
             <label>email</label>
             <input type="email" value={email} onChange={handleEmailChange}></input>
             <button type='submit'>Submit</button>
           </form>
         </div>
         <div>
           {collection.map((item, index) => (
             <div key={index}>{item.name}</div>
           ))}
         </div>
       </div>
     </>
  )
 }
 
 export default App;
 