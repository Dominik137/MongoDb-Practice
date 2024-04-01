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

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/data/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {     
        const updatedCollection = collection.filter(item => item._id !== id);
        setCollection(updatedCollection);
      }
    })
    .catch(error => {
      console.error('Error deleting data:', error);
      // Optionally, handle the error appropriately
    });
  }
  const handleToggleEditMode = (index) => {
    const updatedCollection = [...collection];
    updatedCollection[index].editMode = true;
    setCollection(updatedCollection);
  };
  
  const handleEditNameChange = (e, index) => {
    const updatedCollection = [...collection];
    updatedCollection[index].updatedName = e.target.value;
    setCollection(updatedCollection);
  };
  
  const handleSaveEdit = (index) => {
    const updatedCollection = [...collection];
    const id = updatedCollection[index]._id; // Assuming _id is the property name for the unique identifier
    fetch(`http://127.0.0.1:5000/data/${id}`, {
      method: 'PATCH', // Assuming you have a PUT endpoint to update the data
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: updatedCollection[index].updatedName }) // Sending the updated name in the request body
    })
      .then(response => {
        if (response.ok) {
          updatedCollection[index].name = updatedCollection[index].updatedName;
          updatedCollection[index].editMode = false;
          setCollection(updatedCollection);
        }
      })
      .catch(error => {
        console.error('Error updating data:', error);
        // Optionally, handle the error appropriately
      });
  };

  
  useEffect(() => {
    setCollection(
      collection.map((item) => ({
        ...item,
        editMode: false,
        updatedName: item.name,
      }))
    );
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
        <label>birth day</label>
        <input></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
    <div>
      {collection.map((item, index) => (
        <div key={index}>
          {item.editMode ? (
            <>
              <input
                type="text"
                value={item.updatedName}
                onChange={(e) => handleEditNameChange(e, index)}
              />
              <button onClick={() => handleSaveEdit(index)}>Save</button>
            </>
          ) : (
            <>
              <span>{item.name}</span>
              <button onClick={() => handleToggleEditMode(index)}>Edit name</button>
              <button onClick={() => handleDelete(item._id)}>delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
</>

  )
 }
 
 export default App;
 