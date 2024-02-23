import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('')
  const [ageRange, setAgeRange] = useState({minAge: '', maxAge: ''})

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/', {
          method: 'GET'
        });
        const resData = await response.json();
        setData(resData.data);
      } catch (e) {
        console.log(e);
      }}
      fetchData()
    }, []) */

  const updateAgeRange = (evt) => {
    const { name, value } = evt.target;
    setAgeRange({...ageRange, [name]: value})
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (ageRange.maxAge >= ageRange.minAge) {
      try {
        const response = await fetch('http://127.0.0.1:5000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(ageRange)
        })
        console.log(response);
        const resData = await response.json();
        console.log(resData);
        setData(resData.data);
      } catch (e) {
        console.log(e);
      }
    } 
    else {
      alert('Please enter a valid age range.')
    }
  }

  return (
    <>
      <h1>Titanic Facts!</h1>
      <h2>Select Age Range</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='minAge'>Minimum</label>
        <input type='number' id='minAge' name='minAge' value={ageRange.minAge} onChange={updateAgeRange}></input>
        <label htmlFor='maxAge'>Maximum</label>
        <input type='number' id='maxAge' name='maxAge' value={ageRange.maxAge} onChange={updateAgeRange}></input>
        <button>Search</button>
      </form>
      <ol>
        {data && data.map((d, i) => (
          <li key={i}>{d.Name}, {d.Age} years old</li>))}
      </ol>
    </>
  );
}

export default App;
