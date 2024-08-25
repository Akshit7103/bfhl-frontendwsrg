import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOption, setSelectedOption] = useState('alphabets');

  const handleSubmit = async () => {
    try {
      const result = await axios.post('https://bajaj-p09v35wtq-akshit-mahajans-projects.vercel.app/bfhl', {
        data: JSON.parse(jsonInput)
      });
      setResponse(result.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch data from the backend.');
    }
  };

  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const displayResult = () => {
    if (!response) return null;
    return response[selectedOption].map((item, index) => <li key={index}>{item}</li>);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bajaj Finserv Health Task</h1>
      <textarea
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON here... e.g., {"data": ["A", "2", "B", "10", "z"]}'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {response && (
        <>
          <h2>Select the type of data to display:</h2>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          <ul>
            {displayResult()}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
